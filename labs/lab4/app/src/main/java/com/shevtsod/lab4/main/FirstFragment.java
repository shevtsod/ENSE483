package com.shevtsod.lab4.main;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.telephony.PhoneNumberUtils;
import android.telephony.SmsManager;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.shevtsod.lab4.R;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

/**
 * A simple {@link Fragment} subclass.
 */
public class FirstFragment extends Fragment implements SensorEventListener {
  private static final String TAG = "FirstFragment";
  private static final int REQUEST_SEND_LOCATION_VIA_SMS = 1;

  private SensorManager sensorManager;
  private Sensor rotationVectorSensor;
  private float orientationX = 0, orientationY = 0, orientationZ = 0;

  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup container,
                           Bundle savedInstanceState) {
    // Inflate the layout for this fragment
    return inflater.inflate(R.layout.fragment_first, container, false);
  }

  @Override
  public void onActivityCreated(@Nullable Bundle savedInstanceState) {
    super.onActivityCreated(savedInstanceState);

    // Initialize sensor manager
    this.sensorManager = (SensorManager) getContext().getSystemService(Context.SENSOR_SERVICE);
    this.rotationVectorSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);

    // Get layout widgets
    final View view = getView();
    final Button btnSubmit = view.findViewById(R.id.btnSubmit);
    final EditText etPhoneNumber = view.findViewById(R.id.etPhoneNumber);

    // "Submit" button was clicked
    btnSubmit.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        requestPermissionsAndSendOrientationViaSMS();
      }
    });

    // "Done" action on EditText element was sent ("Submit" key on keyboard)
    etPhoneNumber.setOnEditorActionListener(new TextView.OnEditorActionListener() {
      @Override public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        switch (actionId) {
          case EditorInfo.IME_ACTION_GO:
            requestPermissionsAndSendOrientationViaSMS();
            return true;
          default:
            return false;
        }
      }
    });
  }

  @Override
  public void onRequestPermissionsResult(
    int requestCode,
    @NonNull String[] permissions,
    @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);

    Log.d(TAG, "onRequestPermissionsResult: " + grantResults.length);

    // Ensure that all permissions were granted before proceeding
    for (int grantResult : grantResults) {
      if (grantResult != PackageManager.PERMISSION_GRANTED) return;
    }

    // Perform an action based on the type of permission that was granted
    switch (requestCode) {
      case REQUEST_SEND_LOCATION_VIA_SMS:
        sendOrientationViaSMS();
        break;
      default:
        break;
    }
  }

  @Override public void onStart() {
    super.onStart();

    // Ask for 10 millisecond updates to the rotation vector sensor
    sensorManager.registerListener(this, rotationVectorSensor, 10000);
  }

  @Override public void onStop() {
    super.onStop();

    // Unregister the sensor listener
    sensorManager.unregisterListener(this);
  }

  @Override public void onSensorChanged(SensorEvent event) {
    if (event.sensor.getType() == Sensor.TYPE_ROTATION_VECTOR) {
      float[] rotationMatrix = new float[9];
      float[] rotationValues = new float[3];

      // Get the current rotation vector and convert to orientation in x, y, z coordinates
      SensorManager.getRotationMatrixFromVector(rotationMatrix, event.values);
      SensorManager
        .remapCoordinateSystem(
          rotationMatrix,
          SensorManager.AXIS_X,
          SensorManager.AXIS_Y,
          rotationMatrix
        );
      SensorManager.getOrientation(rotationMatrix, rotationValues);

      // Update x, y, z coordinates in Fragment
      orientationX = (float) Math.toDegrees(rotationValues[0]);
      orientationY = (float) Math.toDegrees(rotationValues[1]);
      orientationZ = (float) Math.toDegrees(rotationValues[2]);
    }
  }

  @Override public void onAccuracyChanged(Sensor sensor, int accuracy) {
    // Do nothing
  }

  /**
   * Request the required permissions to call {@link #sendOrientationViaSMS()} and call it if the
   * permissions were granted by the user.
   */
  private void requestPermissionsAndSendOrientationViaSMS() {
    // List to hold all permissions that will need to be requested
    List<String> permissionsNeeded = new ArrayList<>();

    // Check if user has granted permission to send SMS
    int sendSMSPermission = ContextCompat.checkSelfPermission(
      getContext(),
      Manifest.permission.SEND_SMS
    );

    if (sendSMSPermission != PackageManager.PERMISSION_GRANTED) {
      permissionsNeeded.add(Manifest.permission.SEND_SMS);
    }

    // If permissions were not previously granted, request those permissions now
    if (!permissionsNeeded.isEmpty()) {
      requestPermissions(
        permissionsNeeded.toArray(new String[0]),
        REQUEST_SEND_LOCATION_VIA_SMS
      );

      return;
    }

    // If permission is granted, send location via SMS
    sendOrientationViaSMS();
  }

  /**
   * Gets the device's current orientation and sends it over SMS to the user entered phone number.
   */
  private void sendOrientationViaSMS() {
    final View view = getView();
    final EditText etPhoneNumber = view.findViewById(R.id.etPhoneNumber);
    String phoneNumber;

    // Set the phone number to send SMS to either from user entered value or pre-populated hint
    if (!etPhoneNumber.getText().toString().equals("")) {
      phoneNumber = etPhoneNumber.getText().toString();
    } else {
      phoneNumber = etPhoneNumber.getHint().toString();
    }

    // Ensure phone number is valid (has at least 3 digits)
    if (phoneNumber.length() < 3) {
      Toast.makeText(getContext(), "Invalid phone number!", Toast.LENGTH_SHORT).show();
      return;
    }

    // Format phone number in format Android expects
    String formattedPhoneNumber = PhoneNumberUtils.formatNumber(phoneNumber);
    // Format orientation values to prevent scientific notation
    DecimalFormat orientationFormat = new DecimalFormat("0.00000");

    // Format the payload to send over SMS as a JSON object
    String jsonOrientation = "{" +
      "\"timestamp\":" + new Date().getTime() + "," +
      "\"x\":" + orientationFormat.format(orientationX) + "," +
      "\"y\":" + orientationFormat.format(orientationY) + "," +
      "\"z\":" + orientationFormat.format(orientationZ) +
      "}";

    // Send this location via SMS
    SmsManager.getDefault().sendTextMessage(
      formattedPhoneNumber,
      null,
      jsonOrientation,
      null,
      null
    );

    // Display toast to user to confirm the SMS was sent and its content
    Toast.makeText(
      getContext(),
      "SMS sent successfully!\n\n" +
        "PHONE NUMBER:\n\t" + formattedPhoneNumber + "\n" +
        "SMS CONTENT:\n\t" + jsonOrientation,
      Toast.LENGTH_LONG
    ).show();

    // Log the SMS that was sent
    Log.d(
      TAG,
      "sendOrientationViaSMS:\n" +
        "PHONE NUMBER: " + formattedPhoneNumber + "\n" +
        "SMS CONTENT: " + jsonOrientation
    );
  }
}

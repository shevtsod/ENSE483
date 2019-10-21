package com.shevtsod.lab4.main;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.telephony.PhoneNumberUtils;
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

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

/**
 * A simple {@link Fragment} subclass.
 */
public class SecondFragment extends Fragment {
  private static final String TAG = "SecondFragment";
  private static final int REQUEST_CALL_PHONE_NUMBER = 1;

  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup container,
                           Bundle savedInstanceState) {
    // Inflate the layout for this fragment
    return inflater.inflate(R.layout.fragment_second, container, false);
  }

  @Override public void onActivityCreated(@Nullable Bundle savedInstanceState) {
    super.onActivityCreated(savedInstanceState);

    // Get layout widgets
    final View view = getView();
    final Button btnSubmit = view.findViewById(R.id.btnSubmit);
    final EditText etPhoneNumber = view.findViewById(R.id.etPhoneNumber);

    // "Submit" button was clicked
    btnSubmit.setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View v) {
        requestPermissionsAndCallPhoneNumber();
      }
    });

    // "Done" action on EditText element was sent ("Submit" key on keyboard)
    etPhoneNumber.setOnEditorActionListener(new TextView.OnEditorActionListener() {
      @Override public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        switch (actionId) {
          case EditorInfo.IME_ACTION_GO:
            requestPermissionsAndCallPhoneNumber();
            return true;
          default:
            return false;
        }
      }
    });
  }

  @Override public void onRequestPermissionsResult(
    int requestCode,
    @NonNull String[] permissions,
    @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);

    // Ensure that all permissions were granted before proceeding
    for (int grantResult : grantResults) {
      if (grantResult != PackageManager.PERMISSION_GRANTED) return;
    }

    // Perform an action based on the type of permission that was granted
    switch (requestCode) {
      case REQUEST_CALL_PHONE_NUMBER:
        callPhoneNumber();
        break;
      default:
        break;
    }
  }

  /**
   * Request the required permissions to call {@link #callPhoneNumber()} and call it if the
   * permissions were granted by the user.
   */
  private void requestPermissionsAndCallPhoneNumber() {
    // List to hold all permissions that will need to be requested
    List<String> permissionsNeeded = new ArrayList<>();

    // Check if user has granted permission to call phone number
    int callPhonePermission = ContextCompat.checkSelfPermission(
      getContext(),
      Manifest.permission.CALL_PHONE
    );

    if (callPhonePermission != PackageManager.PERMISSION_GRANTED) {
      permissionsNeeded.add(Manifest.permission.CALL_PHONE);
    }

    // If permissions were not previously granted, request those permissions now
    if (!permissionsNeeded.isEmpty()) {
      requestPermissions(
        permissionsNeeded.toArray(new String[0]),
        REQUEST_CALL_PHONE_NUMBER
      );

      return;
    }

    // If permission is granted, call the number
    callPhoneNumber();
  }

  /**
   * Calls the user entered phone number.
   */
  private void callPhoneNumber() {
    // Get layout widgets
    final View view = getView();
    final EditText etPhoneNumber = view.findViewById(R.id.etPhoneNumber);

    String phoneNumber = etPhoneNumber.getText().toString();

    // Ensure phone number is valid (has at least 3 digits)
    if (phoneNumber.length() < 3) {
      Toast.makeText(getContext(), "Invalid phone number!", Toast.LENGTH_SHORT).show();
      return;
    }

    // Format phone number in format Android expects
    String formattedPhoneNumber = PhoneNumberUtils.formatNumber(phoneNumber);

    // Send an intent to make call the user entered number
    Intent intent = new Intent(Intent.ACTION_CALL);
    intent.setData(Uri.parse("tel:" + formattedPhoneNumber));
    startActivity(intent);

    // Log the phone number that was called
    Log.d(
      TAG,
      "callPhoneNumber:\n" +
        "PHONE NUMBER: " + formattedPhoneNumber
    );
  }
}

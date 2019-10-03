package com.shevtsod.lab2;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements SensorEventListener {
    private SensorManager sensorManager;
    private Sensor rotationVectorSensor;

    private float x = 0, y = 0, z = 0;

    /**
     * Instantiates MainActivity.
     *
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set layout XML
        setContentView(R.layout.activity_main);

        // Disable navigation button to this activity
        findViewById(R.id.btnMainActivity).setEnabled(false);

        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        rotationVectorSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);

        // When the button to get orientation is called, use the rotation vector sensor
        // to get the x, y, and z values of the rotation vector.
        findViewById(R.id.btnGetRotation).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ((TextView) findViewById(R.id.textX)).setText("X: " + (int) x);
                ((TextView) findViewById(R.id.textY)).setText("Y: " + (int) y);
                ((TextView) findViewById(R.id.textZ)).setText("Z: " + (int) z);
            }
        });
    }

    @Override
    protected void onStart() {
        super.onStart();

        // Ask for 10 millisecond updates to the rotation vector sensor
        sensorManager.registerListener(this, rotationVectorSensor, 10000);
    }

    @Override
    protected void onStop() {
        super.onStop();

        // Unregister the sensor listener
        sensorManager.unregisterListener(this);
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        if(sensorEvent.sensor.getType() == Sensor.TYPE_ROTATION_VECTOR) {
            float[] rotationMatrix = new float[9];
            float[] rotationValues = new float[3];

            SensorManager.getRotationMatrixFromVector(rotationMatrix, sensorEvent.values);
            SensorManager.remapCoordinateSystem(rotationMatrix, SensorManager.AXIS_X, SensorManager.AXIS_Y, rotationMatrix);

            SensorManager.getOrientation(rotationMatrix, rotationValues);

            x = (float) Math.toDegrees(rotationValues[0]);
            y = (float) Math.toDegrees(rotationValues[1]);
            z = (float) Math.toDegrees(rotationValues[2]);
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }
}

package com.shevtsod.lab2;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SecondActivity extends AppCompatActivity {
    int REQUEST_ACCESS_COARSE_LOCATION = 1;

    private FusedLocationProviderClient fusedLocationClient;

    private List<String> locations = new ArrayList<>();

    ArrayAdapter<String> adapter;

    /**
     * Instantiates SecondActivity.
     *
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set layout XML
        setContentView(R.layout.activity_second);

        // Disable navigation button to this activity
        findViewById(R.id.btnSecondActivity).setEnabled(false);

        // Find the ListView in the layout to display locations inside
        final ListView lvLocation = findViewById(R.id.lvLocation);

        // Set the locations list of strings in this ListView's adapter
        adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, locations);
        lvLocation.setAdapter(adapter);

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        // Button to get location was clicked
        findViewById(R.id.btnGetGPS).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Check if user has given permission to access location
                int permission = ContextCompat.checkSelfPermission(
                        SecondActivity.this,
                        Manifest.permission.ACCESS_COARSE_LOCATION
                );

                if(permission != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(
                            SecondActivity.this,
                            new String[]{Manifest.permission.ACCESS_COARSE_LOCATION},
                            REQUEST_ACCESS_COARSE_LOCATION
                    );
                } else {
                    getLocationAndAppendToList();
                }
            }
        });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == REQUEST_ACCESS_COARSE_LOCATION) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                getLocationAndAppendToList();
            }
        }
    }

    /**
     * Gets the user's last location and appends it to the list of locations.
     */
    void getLocationAndAppendToList() {
        // Ask for location and handle success and error
        Task<Location> locationTask = fusedLocationClient.getLastLocation();

        // If location was retrieved successfully
        locationTask.addOnSuccessListener(SecondActivity.this, new OnSuccessListener<Location>() {
            @Override
            public void onSuccess(Location location) {
                // Handle cases where location is and is not null
                if (location != null) {
                    locations.add(
                        "DATE: " + new Date() + "\n" +
                        "LATITUDE: " + location.getLatitude() + "\n" +
                        "LONGITUDE: " + location.getLongitude()
                    );
                } else {
                    locations.add(
                        "DATE: " + new Date() + "\n" +
                        "Location has not been recorded yet!"
                    );
                }

                // Update ListView with new data
                adapter.notifyDataSetChanged();
            }
        });

        // If error
        locationTask.addOnFailureListener(SecondActivity.this, new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                locations.add(
                    "DATE: " + new Date() + "\n" +
                    "Error fetching location!"
                );

                // Update ListView with new data
                adapter.notifyDataSetChanged();
            }
        });
    }
}

package com.shevtsod.lab3.main;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.location.Location;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.shevtsod.lab3.R;
import com.shevtsod.lab3.geo_photo.GeoPhotoActivity;

import java.util.Date;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

/**
 * A simple {@link Fragment} subclass.
 */
public class FirstFragment extends Fragment {
  private static final int REQUEST_ACCESS_COARSE_LOCATION = 1;
  private static final int REQUEST_IMAGE_CAPTURE = 1;

  private com.shevtsod.lab3.Location location;
  private Bitmap photo;

  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup container,
                           Bundle savedInstanceState) {
    // Inflate the layout for this fragment
    return inflater.inflate(R.layout.fragment_first, container, false);
  }

  @Override
  public void onActivityCreated(@Nullable Bundle savedInstanceState) {
    super.onActivityCreated(savedInstanceState);

    final View view = getView();

    Button btnTakeGeoPhoto = view.findViewById(R.id.btnTakeGeoPhoto);

    // Button to take geo-tagged photo was clicked
    btnTakeGeoPhoto.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        // Check if user has granted permission to access location
        int permission = ContextCompat.checkSelfPermission(
          view.getContext(),
          Manifest.permission.ACCESS_COARSE_LOCATION
        );

        // If permission was not previously granted, request permission now
        if (permission != PackageManager.PERMISSION_GRANTED) {
          requestPermissions(
            new String[]{Manifest.permission.ACCESS_COARSE_LOCATION},
            REQUEST_ACCESS_COARSE_LOCATION
          );

          return;
        }

        // If permission is granted, take the geo-tagged photo
        takeGeoTaggedPhoto();
      }
    });
  }

  @Override
  public void onRequestPermissionsResult(
    int requestCode,
    @NonNull String[] permissions,
    @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);

    // Iterate through all permissions that were requested
    for (int i = 0; i < permissions.length; i++) {
      // Ensure that the permission was granted
      if (grantResults[i] != PackageManager.PERMISSION_GRANTED) continue;

      // Perform an action based on the type of permission that was granted
      if (requestCode == REQUEST_ACCESS_COARSE_LOCATION) {
        takeGeoTaggedPhoto();
      }
    }
  }

  @Override public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    // Ensure that the activity result is successful
    if (resultCode != Activity.RESULT_OK) return;

    if (requestCode == REQUEST_IMAGE_CAPTURE) {
      // Set photo from activity result
      Bitmap photo = (Bitmap) data.getExtras().get("data");
      setPhoto(photo);

      // Start a new activity and pass it the photo and geo-tag
      Intent intent = new Intent(getContext(), GeoPhotoActivity.class);

      intent.putExtra("photo", getPhoto());

      if (location != null) {
        intent.putExtra("latitude", getLocation().getLatitude());
        intent.putExtra("longitude", getLocation().getLongitude());
      }

      startActivity(intent);
    }
  }

  private void takeGeoTaggedPhoto() {
    // Get a handle to the location provider client to get last location
    FusedLocationProviderClient lpClient =
      LocationServices.getFusedLocationProviderClient(getContext());

    // Get the last location
    lpClient.getLastLocation()
      .addOnCompleteListener(new OnCompleteListener<Location>() {
        @Override public void onComplete(@NonNull Task<Location> task) {
          Location location = task.getResult();

          // Set the location in this fragment based on the result
          if (location != null) {
            setLocation(new Date(), location.getLatitude(), location.getLongitude());
          } else {
            setLocation(null);
          }
        }
      });

    // Start an intent to take a photo and pass the current location to it
    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

    if (intent.resolveActivity(getActivity().getPackageManager()) != null) {
      startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);
    }
  }

  public com.shevtsod.lab3.Location getLocation() {
    return location;
  }

  public void setLocation(com.shevtsod.lab3.Location location) {
    this.location = location;
  }

  /**
   * Set the current location based on the given date, latitude, and longitude parameters.
   *
   * @param date      Date when location was recorded
   * @param latitude  Recorded latitude value
   * @param longitude Recorded longitude value
   */
  public void setLocation(Date date, double latitude, double longitude) {
    this.location = new com.shevtsod.lab3.Location(date, latitude, longitude);
  }

  public Bitmap getPhoto() {
    return photo;
  }

  public void setPhoto(Bitmap photo) {
    this.photo = photo;
  }
}

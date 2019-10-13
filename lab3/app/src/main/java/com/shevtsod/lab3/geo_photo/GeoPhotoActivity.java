package com.shevtsod.lab3.geo_photo;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import com.shevtsod.lab3.R;

import java.util.Locale;

import androidx.appcompat.app.AppCompatActivity;

public class GeoPhotoActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_geo_photo);

    ImageView ivPhoto = findViewById(R.id.ivPhoto);
    TextView tvLatitude = findViewById(R.id.tvLatitude);
    TextView tvLongitude = findViewById(R.id.tvLongitude);

    // Populate information based on data passed to this activity via the Intent that started it
    Intent prevIntent = getIntent();

    Bitmap photo = (Bitmap) prevIntent.getExtras().get("photo");
    double latitude = prevIntent.getDoubleExtra("latitude", 0.0);
    double longitude = prevIntent.getDoubleExtra("longitude", 0.0);

    ivPhoto.setImageBitmap(photo);
    tvLatitude.setText(String.format(Locale.getDefault(), "%.2f", latitude));
    tvLongitude.setText(String.format(Locale.getDefault(), "%.2f", longitude));
  }
}

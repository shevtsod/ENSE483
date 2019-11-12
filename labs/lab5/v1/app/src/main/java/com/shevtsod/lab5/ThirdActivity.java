package com.shevtsod.lab5;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class ThirdActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_third);

    // Result to return from this activity
    final String payload = "{\"source\":\"ThirdActivity\",\"data\": \"0.123456789\"}";

    // Return after 5 seconds
    new android.os.Handler().postDelayed(new Runnable() {
      @Override public void run() {
        final Intent intent = new Intent();
        intent.setData(Uri.parse(payload));

        setResult(RESULT_OK, intent);
        finish();
      }
    }, 5000);
  }
}

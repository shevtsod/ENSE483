package com.shevtsod.lab5;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
  private static final String TAG = "MainActivity";
  private static final int REQUEST_FIRST_ACTIVITY = 0;
  private static final int REQUEST_SECOND_ACTIVITY = 1;
  private static final int REQUEST_THIRD_ACTIVITY = 2;

  Button btnStartFirstActivity;
  Button btnStartSecondActivity;
  Button btnStartThirdActivity;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    btnStartFirstActivity = (Button) findViewById(R.id.btnStartFirstActivity);
    btnStartSecondActivity = (Button) findViewById(R.id.btnStartSecondActivity);
    btnStartThirdActivity = (Button) findViewById(R.id.btnStartThirdActivity);

    btnStartFirstActivity.setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View view) {
        Intent intent = new Intent(MainActivity.this, FirstActivity.class);
        startActivityForResult(intent, REQUEST_FIRST_ACTIVITY);
      }
    });

    btnStartSecondActivity.setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View view) {
        Intent intent = new Intent(MainActivity.this, SecondActivity.class);
        startActivityForResult(intent, REQUEST_SECOND_ACTIVITY);
      }
    });

    btnStartThirdActivity.setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View view) {
        Intent intent = new Intent(MainActivity.this, ThirdActivity.class);
        startActivityForResult(intent, REQUEST_THIRD_ACTIVITY);
      }
    });
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
    super.onActivityResult(requestCode, resultCode, intent);

    // Handle errors in activity result
    if (resultCode != RESULT_OK) {
      Toast.makeText(this, "Error in activity result!", Toast.LENGTH_LONG);
      return;
    }

    // Get data from activity result
    String data = intent.getData().toString();

    // Handle activity results of different request codes
    switch (requestCode) {
      case REQUEST_FIRST_ACTIVITY:
        Toast.makeText(this, "FirstActivity returned:\n\n" + data, Toast.LENGTH_LONG).show();
        break;
      case REQUEST_SECOND_ACTIVITY:
        Toast.makeText(this, "SecondActivity returned:\n\n" + data, Toast.LENGTH_LONG).show();
        break;
      case REQUEST_THIRD_ACTIVITY:
        Toast.makeText(this, "ThirdActivity returned:\n\n" + data, Toast.LENGTH_LONG).show();
        break;
      default:
        Toast.makeText(this, "Unknown activity result!", Toast.LENGTH_LONG).show();
    }
  }
}

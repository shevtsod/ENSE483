package com.shevtsod.lab5;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class FirstActivity extends AppCompatActivity {
  Button btnReturn;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_first);

    btnReturn = (Button) findViewById(R.id.btnReturn);

    // Result to return from this activity
    final String payload = "{\"source\":\"FirstActivity\",\"data\": \"Hello from FirstActivity!\"}";

    // When return button is clicked, return result from this activity
    btnReturn.setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View view) {
        Intent intent = new Intent();
        intent.setData(Uri.parse(payload));

        setResult(RESULT_OK, intent);
        finish();
      }
    });
  }
}

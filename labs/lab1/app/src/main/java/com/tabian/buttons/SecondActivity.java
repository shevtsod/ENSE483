package com.tabian.buttons;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import java.util.ArrayList;

public class SecondActivity extends AppCompatActivity {

    private static final String TAG = "SecondActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_second);
        Log.d(TAG, "onCreate: Started.");

        // Navigation buttons
        final Button buttonMainActivity = (Button) findViewById(R.id.buttonMainActivity);
        final Button buttonSecondActivity = (Button) findViewById(R.id.buttonSecondActivity);
        final Button buttonThirdActivity = (Button) findViewById(R.id.buttonThirdActivity);

        // ListView
        final ListView list = (ListView) findViewById(R.id.list);

        // ListView initialization
        ArrayList<String> items = new ArrayList<>();
        items.add("Device Name");
        items.add("Model");
        items.add("Serial Number");
        items.add("Connected Devices");
        items.add("Logs");
        items.add("Miscellaneous Information");
        items.add("Version");
        ArrayAdapter adapter = new ArrayAdapter(this, R.layout.activity_second_list_item_layout, items);
        list.setAdapter(adapter);

        buttonSecondActivity.setEnabled(false);

        // onClick listeners

        buttonMainActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked buttonMainActivity");

                Intent intent = new Intent(SecondActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });

        buttonThirdActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked buttonThirdActivity");

                Intent intent = new Intent(SecondActivity.this, ThirdActivity.class);
                startActivity(intent);
            }
        });
    }

}

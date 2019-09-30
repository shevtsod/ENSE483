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

public class ThirdActivity extends AppCompatActivity {

    private static final String TAG = "ThirdActivity";
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_third);
        Log.d(TAG, "onCreate: Started.");

        // Navigation buttons
        final Button buttonMainActivity = (Button) findViewById(R.id.buttonMainActivity);
        final Button buttonSecondActivity = (Button) findViewById(R.id.buttonSecondActivity);
        final Button buttonThirdActivity = (Button) findViewById(R.id.buttonThirdActivity);

        // ListView
        final ListView list = (ListView) findViewById(R.id.list);

        // ListView initialization
        ArrayList<String> items = new ArrayList<>();
        items.add("Temperature Sensor 1");
        items.add("Temperature Sensor 2");
        items.add("Temperature Sensor 3");
        items.add("Motion Sensor 1");
        items.add("Motion Sensor 2");
        items.add("Motion Sensor 3");
        items.add("Light Level Sensor 1");
        items.add("Light Level Sensor 2");
        items.add("Light Level Sensor 3");
        ArrayAdapter adapter = new ArrayAdapter(this, android.R.layout.simple_expandable_list_item_1, items);
        list.setAdapter(adapter);

        buttonThirdActivity.setEnabled(false);

        // onClick listeners

        buttonMainActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked buttonMainActivity");

                Intent intent = new Intent(ThirdActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });

        buttonSecondActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked buttonSecondActivity");

                Intent intent = new Intent(ThirdActivity.this, SecondActivity.class);
                startActivity(intent);
            }
        });
    }

}

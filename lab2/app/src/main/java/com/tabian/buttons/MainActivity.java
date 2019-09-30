package com.tabian.buttons;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        Log.d(TAG, "onCreate: Started.");

        // Navigation buttons
        final Button buttonMainActivity = (Button) findViewById(R.id.buttonMainActivity);
        final Button buttonSecondActivity = (Button) findViewById(R.id.buttonSecondActivity);
        final Button buttonThirdActivity = (Button) findViewById(R.id.buttonThirdActivity);

        // Activity buttons
        final Button btnOne = (Button) findViewById(R.id.btnOne);
        final Button btnTwo = (Button) findViewById(R.id.btnTwo);
        final Button btnThree = (Button) findViewById(R.id.btnThree);

        // Image
        final ImageView image = (ImageView) findViewById(R.id.image);

        buttonMainActivity.setEnabled(false);

        // OnClick listeners

        buttonSecondActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked buttonSecondActivity");

                Intent intent = new Intent(MainActivity.this, SecondActivity.class);
                startActivity(intent);
            }
        });

        buttonThirdActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked buttonThirdActivity");

                Intent intent = new Intent(MainActivity.this, ThirdActivity.class);
                startActivity(intent);
            }
        });

        btnOne.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked Button One!");
                toastMessage("Clicked Button One");
            }
        });

        btnTwo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked Button Two!");
                toastMessage("Clicked Button Two");
            }
        });

        btnThree.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked Show/Hide Image Button!");

                switch(image.getVisibility()) {
                    case View.VISIBLE:
                        btnThree.setText("Show Image");
                        image.setVisibility(View.INVISIBLE);
                        break;
                    case View.INVISIBLE:
                        btnThree.setText("Hide Image");
                        image.setVisibility(View.VISIBLE);
                        break;
                    case View.GONE:
                    default:
                        break;
                }
            }
        });
    }

    /**
     * Prints out the message as a toast
     * @param message Message to print
     */
    private void toastMessage(String message){
        Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
    }
}

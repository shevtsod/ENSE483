package com.tabian.buttons;

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

        Button firstButton = (Button) findViewById(R.id.btnOne);
        Button secondButton = (Button) findViewById(R.id.btnTwo);
        final Button showHideImageButton = (Button) findViewById(R.id.btnThree);

        firstButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked Button One!");
                toastMessage("Clicked Button One");
            }
        });

        secondButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked Button Two!");
                toastMessage("Clicked Button Two");
            }
        });

        showHideImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Clicked Show/Hide Image Button!");

                ImageView image = (ImageView) findViewById(R.id.image);

                if (image.getVisibility() == View.VISIBLE) {
                    showHideImageButton.setText("Show Image");
                    image.setVisibility(View.INVISIBLE);
                } else {
                    showHideImageButton.setText("Hide Image");
                    image.setVisibility(View.VISIBLE);
                }
            }
        });
    }

    /**
     * Prints out the message as a toast
     * @param message
     */
    private void toastMessage(String message){
        Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
    }
}

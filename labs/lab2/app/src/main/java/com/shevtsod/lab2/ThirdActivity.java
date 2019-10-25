package com.shevtsod.lab2;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;

public class ThirdActivity extends AppCompatActivity {
    private static final String TAG = "ThirdActivity";
    
    static final int REQUEST_IMAGE_CAPTURE = 1;

    /**
     * Instantiates ThirdActivity.
     *
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set layout XML
        setContentView(R.layout.activity_third);

        // Disable navigation button to this activity
        findViewById(R.id.btnThirdActivity).setEnabled(false);

        // When the button to take a photo is clicked, delegate taking a photo to the user's
        // camera app. When the photo is taken, display the thumbnail.
        findViewById(R.id.btnTakePhoto).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                if (intent.resolveActivity(getPackageManager())!= null) {
                    startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);
                }
            }
        });
    }

    /**
     * Handles results from startActivityForResult calls.
     *
     * @param requestCode
     * @param resultCode
     * @param data
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        try {
            if (resultCode == RESULT_OK) {
                switch (requestCode) {
                    case REQUEST_IMAGE_CAPTURE:
                        setPhoto((Bitmap) data.getExtras().get("data"));
                        break;
                    default:
                        break;
                }
            }
        } catch (NullPointerException e) {
            Log.d(TAG, "onActivityResult: " + e.getMessage());
        }
    }

    /**
     * Sets the given bitmap as the photo for this activity.
     *
     * @param bitmap
     */
    protected void setPhoto(Bitmap bitmap) {
        ImageView photo = findViewById(R.id.photo);

        // Ensure that photo is visible
        photo.setVisibility(View.VISIBLE);

        // Set the bitmap into the photo
        photo.setImageBitmap(bitmap);
    }
}

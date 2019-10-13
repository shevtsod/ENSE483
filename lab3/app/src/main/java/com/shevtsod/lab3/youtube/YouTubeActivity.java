package com.shevtsod.lab3.youtube;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.android.youtube.player.YouTubeBaseActivity;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerView;
import com.shevtsod.lab3.BuildConfig;
import com.shevtsod.lab3.R;

public class YouTubeActivity extends YouTubeBaseActivity {
  YouTubePlayerView ytPlayer;
  YouTubePlayer.OnInitializedListener ytOnInitializedListener;

  private String url;

  private static final String TAG = "YouTubeActivity";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_youtube);

    ytPlayer = findViewById(R.id.ytPlayer);

    // Populate information based on data passed to this activity via the Intent that started it
    Intent prevIntent = getIntent();

    Log.d(TAG, "onCreate: " + prevIntent.getStringExtra("url"));

    setUrl(prevIntent.getStringExtra("url"));

    ytOnInitializedListener = new YouTubePlayer.OnInitializedListener() {
      @Override public void onInitializationSuccess(YouTubePlayer.Provider provider,
                                                    YouTubePlayer youTubePlayer, boolean b) {
        youTubePlayer.loadVideo(getUrl());
      }

      @Override public void onInitializationFailure(YouTubePlayer.Provider provider,
                                                    YouTubeInitializationResult youTubeInitializationResult) {
        Toast
          .makeText(
            YouTubeActivity.this,
            "Could not play YouTube video!",
            Toast.LENGTH_LONG)
          .show();
      }
    };

    // Initialize the YouTube player
    ytPlayer.initialize(BuildConfig.YOUTUBE_API_KEY, ytOnInitializedListener);
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }
}

package com.shevtsod.lab3.main;

import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.shevtsod.lab3.R;
import com.shevtsod.lab3.youtube.YouTubeActivity;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

/**
 * A simple {@link Fragment} subclass.
 */
public class SecondFragment extends Fragment {
  EditText etUrl;
  Button btnPlayVideo;

  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup container,
                           Bundle savedInstanceState) {
    // Inflate the layout for this fragment
    return inflater.inflate(R.layout.fragment_second, container, false);
  }

  @Override public void onActivityCreated(@Nullable Bundle savedInstanceState) {
    super.onActivityCreated(savedInstanceState);

    View view = getView();

    setEtUrl((EditText) view.findViewById(R.id.etUrl));
    setBtnPlayVideo((Button) view.findViewById(R.id.btnPlayVideo));

    // When "Done" action on EditText element is sent (enter on keyboard)
    getEtUrl().setOnEditorActionListener(new TextView.OnEditorActionListener() {
      @Override public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        boolean handled = false;

        if (actionId == EditorInfo.IME_ACTION_DONE) {
          startYouTubeActivity();
          handled = true;
        }

        return handled;
      }
    });

    // When "play YouTube video" button is clicked
    getBtnPlayVideo().setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View v) {
        startYouTubeActivity();
      }
    });
  }

  /**
   * Starts the {@link YouTubeActivity} and passes it the URL from this fragment.
   */
  public void startYouTubeActivity() {
    // Start a new activity and pass it the YouTube URL the user entered (or the default)
    Intent intent = new Intent(getContext(), YouTubeActivity.class);

    if (!getEtUrl().getText().toString().equals("")) {
      intent.putExtra("url", getEtUrl().getText().toString());
    } else {
      intent.putExtra("url", getEtUrl().getHint().toString());
    }

    startActivity(intent);
  }

  public EditText getEtUrl() {
    return etUrl;
  }

  public void setEtUrl(EditText etUrl) {
    this.etUrl = etUrl;
  }

  public Button getBtnPlayVideo() {
    return btnPlayVideo;
  }

  public void setBtnPlayVideo(Button btnPlayVideo) {
    this.btnPlayVideo = btnPlayVideo;
  }
}

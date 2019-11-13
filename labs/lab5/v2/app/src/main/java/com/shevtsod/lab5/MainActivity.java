package com.shevtsod.lab5;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {

  // Create a BroadcastReceiver for battery level changes
  private final BroadcastReceiver mBroadcastReceiver1 = new BroadcastReceiver() {
    public void onReceive(Context context, Intent intent) {
      String action = intent.getAction();

      if (Intent.ACTION_BATTERY_CHANGED.equals(action)) {
        int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);

        float batteryPct = level / (float) scale * 100;

        Toast.makeText(
          MainActivity.this,
          "Current battery level: " + batteryPct + "%",
          Toast.LENGTH_SHORT
        ).show();
      }
    }
  };

  // Create a BroadcastReceiver for airplane mode changes
  private final BroadcastReceiver mBroadcastReceiver2 = new BroadcastReceiver() {

    @Override
    public void onReceive(Context context, Intent intent) {
      final String action = intent.getAction();

      if (Intent.ACTION_AIRPLANE_MODE_CHANGED.equals(action)) {
        boolean state = intent.getBooleanExtra("state", false);

        if (state) {
          Toast.makeText(
            MainActivity.this,
            "Airplane Mode is on!",
            Toast.LENGTH_SHORT
          ).show();
        } else {
          Toast.makeText(
            MainActivity.this,
            "Airplane Mode is off!",
            Toast.LENGTH_SHORT
          ).show();
        }
      }
    }
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Register BroadcastReceivers
    IntentFilter filter1 = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
    registerReceiver(mBroadcastReceiver1, filter1);

    IntentFilter filter2 = new IntentFilter(Intent.ACTION_AIRPLANE_MODE_CHANGED);
    registerReceiver(mBroadcastReceiver2, filter2);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();

    unregisterReceiver(mBroadcastReceiver1);
    unregisterReceiver(mBroadcastReceiver2);
  }
}

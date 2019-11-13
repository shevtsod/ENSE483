package com.shevtsod.lab5;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;

import java.util.ArrayList;


public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {
  private static final String TAG = "MainActivity";
  private static final int REQUEST_ACCESS_FINE_LOCATION = 0;

  BluetoothAdapter mBluetoothAdapter;

  public ArrayList<BluetoothDevice> mBTDevices = new ArrayList<>();
  public DeviceListAdapter mDeviceListAdapter;

  Button btnONOFF;
  Button btnDiscoverable_on_off;
  Button btnFindUnpairedDevices;
  ListView lvNewDevices;

  // Create a BroadcastReceiver for all relevant Bluetooth actions
  private final BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver() {
    public void onReceive(Context context, Intent intent) {
      String action = intent.getAction();

      switch (action) {
        // BT adapter state change (turn on or off)
        case BluetoothAdapter.ACTION_STATE_CHANGED:
          final int state =
            intent.getIntExtra(BluetoothAdapter.EXTRA_STATE, BluetoothAdapter.ERROR);

          switch (state) {
            case BluetoothAdapter.STATE_OFF:
              Log.d(TAG, "onReceive: STATE OFF");
              break;
            case BluetoothAdapter.STATE_TURNING_OFF:
              Log.d(TAG, "mBroadcastReceiver1: STATE TURNING OFF");
              break;
            case BluetoothAdapter.STATE_ON:
              Log.d(TAG, "mBroadcastReceiver1: STATE ON");
              break;
            case BluetoothAdapter.STATE_TURNING_ON:
              Log.d(TAG, "mBroadcastReceiver1: STATE TURNING ON");
              break;
          }
          break;
        // BT adapter scan mode change (discoverable?)
        case BluetoothAdapter.ACTION_SCAN_MODE_CHANGED:
          int mode = intent.getIntExtra(BluetoothAdapter.EXTRA_SCAN_MODE, BluetoothAdapter.ERROR);

          switch (mode) {
            //Device is in Discoverable Mode
            case BluetoothAdapter.SCAN_MODE_CONNECTABLE_DISCOVERABLE:
              Log.d(TAG, "mBroadcastReceiver2: Discoverability Enabled.");
              break;
            //Device not in discoverable mode
            case BluetoothAdapter.SCAN_MODE_CONNECTABLE:
              Log.d(TAG,
                "mBroadcastReceiver2: Discoverability Disabled. Able to receive connections.");
              break;
            case BluetoothAdapter.SCAN_MODE_NONE:
              Log.d(TAG,
                "mBroadcastReceiver2: Discoverability Disabled. Not able to receive connections.");
              break;
            case BluetoothAdapter.STATE_CONNECTING:
              Log.d(TAG, "mBroadcastReceiver2: Connecting....");
              break;
            case BluetoothAdapter.STATE_CONNECTED:
              Log.d(TAG, "mBroadcastReceiver2: Connected.");
              break;
          }
          break;
        // BT device discovery found a device
        case BluetoothDevice.ACTION_FOUND:
          BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);

          mBTDevices.add(device);

          Log.d(TAG, "onReceive: " + device.getName() + ": " + device.getAddress());

          mDeviceListAdapter =
            new DeviceListAdapter(context, R.layout.device_adapter_view, mBTDevices);

          lvNewDevices.setAdapter(mDeviceListAdapter);
          break;
        // BT device bonding
        case BluetoothDevice.ACTION_BOND_STATE_CHANGED:
          BluetoothDevice mDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);

          //3 cases:
          //case1: bonded already
          if (mDevice.getBondState() == BluetoothDevice.BOND_BONDED) {
            Log.d(TAG, "BroadcastReceiver: BOND_BONDED.");
          }
          //case2: creating a bone
          if (mDevice.getBondState() == BluetoothDevice.BOND_BONDING) {
            Log.d(TAG, "BroadcastReceiver: BOND_BONDING.");
          }
          //case3: breaking a bond
          if (mDevice.getBondState() == BluetoothDevice.BOND_NONE) {
            Log.d(TAG, "BroadcastReceiver: BOND_NONE.");
          }
        default:
          break;
      }
    }
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    btnONOFF = (Button) findViewById(R.id.btnONOFF);
    btnDiscoverable_on_off = (Button) findViewById(R.id.btnDiscoverable_on_off);
    btnFindUnpairedDevices = (Button) findViewById(R.id.btnFindUnpairedDevices);
    lvNewDevices = (ListView) findViewById(R.id.lvNewDevices);

    mBTDevices = new ArrayList<>();

    // Listen to all relevant BT broadcasts
    IntentFilter filter = new IntentFilter();

    filter.addAction(BluetoothAdapter.ACTION_STATE_CHANGED);
    filter.addAction(BluetoothAdapter.ACTION_SCAN_MODE_CHANGED);
    filter.addAction(BluetoothDevice.ACTION_FOUND);
    filter.addAction(BluetoothDevice.ACTION_BOND_STATE_CHANGED);

    registerReceiver(mBroadcastReceiver, filter);

    mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

    lvNewDevices.setOnItemClickListener(MainActivity.this);

    btnONOFF.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        enableDisableBT();
      }
    });

    btnDiscoverable_on_off.setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View view) {
        btnEnableDisable_Discoverable();
      }
    });

    btnFindUnpairedDevices.setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View view) {
        btnDiscover();
      }
    });
  }

  @Override
  protected void onDestroy() {
    Log.d(TAG, "onDestroy: called.");
    super.onDestroy();
    unregisterReceiver(mBroadcastReceiver);
  }

  @Override
  public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
    //first cancel discovery because its very memory intensive.
    mBluetoothAdapter.cancelDiscovery();

    Log.d(TAG, "onItemClick: You Clicked on a device.");
    String deviceName = mBTDevices.get(i).getName();
    String deviceAddress = mBTDevices.get(i).getAddress();

    Log.d(TAG, "onItemClick: deviceName = " + deviceName);
    Log.d(TAG, "onItemClick: deviceAddress = " + deviceAddress);

    //create the bond.
    //NOTE: Requires API 17+? I think this is JellyBean
    if (Build.VERSION.SDK_INT > Build.VERSION_CODES.JELLY_BEAN_MR2) {
      Log.d(TAG, "Trying to pair with " + deviceName);
      mBTDevices.get(i).createBond();
    }
  }

  public void enableDisableBT() {
    if (mBluetoothAdapter == null) {
      Log.d(TAG, "enableDisableBT: Does not have BT capabilities.");
      return;
    }

    if (!mBluetoothAdapter.isEnabled()) {
      Log.d(TAG, "enableDisableBT: enabling BT.");
      Intent enableBTIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
      startActivity(enableBTIntent);
      return;
    }

    Log.d(TAG, "enableDisableBT: disabling BT.");
    mBluetoothAdapter.disable();
  }


  public void btnEnableDisable_Discoverable() {
    Log.d(TAG, "btnEnableDisable_Discoverable: Making device discoverable for 300 seconds.");

    Intent discoverableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
    discoverableIntent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, 300);
    startActivity(discoverableIntent);
  }

  public void btnDiscover() {
    Log.d(TAG, "btnDiscover: Looking for unpaired devices.");

    if (mBluetoothAdapter.isDiscovering()) {
      mBluetoothAdapter.cancelDiscovery();
      Log.d(TAG, "btnDiscover: Canceling discovery.");

      //check BT permissions in manifest
      checkBTPermissions();

      mBluetoothAdapter.startDiscovery();
    }
    if (!mBluetoothAdapter.isDiscovering()) {

      //check BT permissions in manifest
      checkBTPermissions();

      mBluetoothAdapter.startDiscovery();
    }
  }

  /**
   * This method is required for all devices running API23+
   * Android must programmatically check the permissions for bluetooth. Putting the proper
   * permissions
   * in the manifest is not enough.
   * <p>
   * NOTE: This will only execute on versions > LOLLIPOP because it is not needed otherwise.
   */
  private void checkBTPermissions() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      int permission = this.checkSelfPermission("Manifest.permission.ACCESS_FINE_LOCATION");
      if (permission != PackageManager.PERMISSION_GRANTED) {
        this.requestPermissions(
          new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
          REQUEST_ACCESS_FINE_LOCATION
        );
      }
    }
  }
}

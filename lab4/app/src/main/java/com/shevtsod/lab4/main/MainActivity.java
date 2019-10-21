package com.shevtsod.lab4.main;

import android.os.Bundle;
import android.view.MenuItem;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.shevtsod.lab4.R;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

public class MainActivity extends AppCompatActivity {
  private BottomNavigationView.OnNavigationItemSelectedListener navigationItemSelectedListener =
    new BottomNavigationView.OnNavigationItemSelectedListener() {
      /**
       * Handles switching between fragments in response to event
       * {@link BottomNavigationView.OnNavigationItemSelectedListener#onNavigationItemSelected(MenuItem)}
       *
       * @param menuItem The menu item that was selected
       * @return true
       */
      @Override
      public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
        Fragment currentFragment = null;

        // Select a fragment based on the menu item that was clicked
        switch (menuItem.getItemId()) {
          case R.id.action_home:
            currentFragment = new HomeFragment();
            break;
          case R.id.action_first:
            currentFragment = new FirstFragment();
            break;
          case R.id.action_second:
            currentFragment = new SecondFragment();
            break;
          default:
            break;
        }

        // Instruct the fragment manager to replace the fragment in the fragment container with
        // the selected fragment.
        if (currentFragment != null) {
          getSupportFragmentManager()
            .beginTransaction()
            .replace(R.id.flFragment, currentFragment)
            .commit();
        }

        return true;
      }
    };

  /**
   * Instantiates MainActivity.
   *
   * @param savedInstanceState
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Bottom navigation bar
    BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigation);
    bottomNavigationView.setOnNavigationItemSelectedListener(navigationItemSelectedListener);

    // Instruct the fragment manager to set the initial fragment in the fragment container
    getSupportFragmentManager()
      .beginTransaction()
      .replace(R.id.flFragment, new HomeFragment())
      .commit();
  }
}

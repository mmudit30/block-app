package com.hacknow.blockapp;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class VerifyFailedActivity extends AppCompatActivity {
    Button btn_qr;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_verify_failed);
        btn_qr = (Button) findViewById(R.id.btn_qr_scan_again);
        btn_qr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openNewActivity();
            }
        });
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
    }
    public void openNewActivity(){
        Intent intent = new Intent(this, CustomQrViewActivity.class);
        startActivity(intent);
    }
}

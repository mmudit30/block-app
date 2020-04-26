package com.hacknow.blockapp;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Dialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;


import org.json.JSONException;
import org.json.JSONObject;

public class DashboardActivity extends AppCompatActivity {
    Button show_qr;
    String patientId, patientName, idType, doctorId, testResult, antibodyCount;
    TextView tv_patientName, tv_testResult, tv_antibodyCount,  tv_warningMsg;
    ImageView im_statusIcon;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        patientId = getIntent().getStringExtra("PATIENT_ID");
        try {
            JSONObject mainObject = new JSONObject(getIntent().getStringExtra("RESPONSE"));
            patientName = mainObject.getString("0");
            idType =  mainObject.getString("1");
            doctorId = mainObject.getString("2");
            testResult = mainObject.getString("3");
            antibodyCount = mainObject.getString("4");

        } catch (JSONException e) {
            e.printStackTrace();
        }
        setContentView(R.layout.activity_dashboard);
        tv_patientName = findViewById(R.id.tv_patientName);
        tv_testResult = findViewById(R.id.tv_testResult);
        tv_warningMsg = findViewById(R.id.tv_warningMsg);
        im_statusIcon = findViewById(R.id.im_statusIcon);


        show_qr = findViewById(R.id.btn_show_qr);
        show_qr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showImage();
//                Dialog settingsDialog = new Dialog(TestActivity.this);
//
//                settingsDialog.getWindow().requestFeature(Window.FEATURE_NO_TITLE);
//                settingsDialog.setContentView(getLayoutInflater().inflate(R.layout.dialog_layout, null));
//                settingsDialog.show();
            }
        });

        updateStatus();
    }
    public void  updateStatus(){
        tv_patientName.setText("Hi "+ patientName);
        if(testResult.equals("Positive Case")){
            tv_testResult.setBackgroundResource(R.color.colorRed);
            tv_testResult.setText(R.string.positive);
            tv_warningMsg.setVisibility(View.VISIBLE);
            im_statusIcon.setImageResource(R.drawable.shield_x);
        } else{
            tv_testResult.setBackgroundResource(R.color.colorGreen);
            tv_testResult.setText(R.string.negative);
            tv_warningMsg.setVisibility(View.INVISIBLE);
            im_statusIcon.setImageResource(R.drawable.shield);
        }
    }
    public void showImage() {
        Dialog builder = new Dialog(this);
        builder.requestWindowFeature(Window.FEATURE_NO_TITLE);
        builder.getWindow().setBackgroundDrawable(
                new ColorDrawable(android.graphics.Color.TRANSPARENT));
        builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialogInterface) {
                //nothing;
            }
        });
        Bitmap myBitmap = QRCodeUtil.encodeAsBitmap(patientId, 600, 600);
        ImageView imageView = new ImageView(this);
        imageView.setImageBitmap(myBitmap);
//        imageView.setImageResource(R.drawable.qr_code);
        builder.addContentView(imageView, new RelativeLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        builder.show();
    }

    @Override
    public void onBackPressed() {
        Intent setIntent = new Intent(this, MainActivity.class);
        setIntent.addCategory(Intent.CATEGORY_HOME);
        setIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(setIntent);
    }
}

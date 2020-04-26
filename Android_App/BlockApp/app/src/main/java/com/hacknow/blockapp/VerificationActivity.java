package com.hacknow.blockapp;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class VerificationActivity extends AppCompatActivity {

    OkHttpClient client = new OkHttpClient();


    public String str_url= "http://worldtimeapi.org/api/timezone/Asia/Kolkata";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        setContentView(R.layout.activity_verification);
        str_url = getIntent().getStringExtra("QR_CODE");
        Toast.makeText(this, str_url, Toast.LENGTH_SHORT).show();
        openActivity(str_url, "");
//        try {
//            run();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
    }
    public void openActivity(@NotNull String strSuccess, String id){
        if(strSuccess.equals("success")){
            Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    Intent intent = new Intent(VerificationActivity.this, VerifySuccessActivity.class);
                    startActivity(intent);
                }
            }, 2000);

        }
        else {
            Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    Intent intent = new Intent(VerificationActivity.this, VerifyFailedActivity.class);
                    startActivity(intent);
                }
            }, 2000);
        }
    }

    void run() throws IOException {

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(str_url)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                call.cancel();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                final String myResponse = response.body().string();

                VerificationActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        openActivity(myResponse,"");
                        Toast.makeText(VerificationActivity.this, myResponse, Toast.LENGTH_SHORT).show();
                    }
                });

            }
        });
    }
}

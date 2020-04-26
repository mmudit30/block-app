package com.hacknow.blockapp;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;

import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class VerificationActivity extends AppCompatActivity {




    public String str_url= "http://192.168.0.108:4000/get-patient-result";
    public String personId = "Person123";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        setContentView(R.layout.activity_verification);
        personId = getIntent().getStringExtra("QR_CODE");
        try {
            run();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void openActivity(@NotNull String myResponse, String error) throws JSONException {
        if(myResponse.equals("")){
            Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    Intent intent = new Intent(VerificationActivity.this, VerifySuccessActivity.class);
                    intent.putExtra("RESPONSE",myResponse );
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                }
            }, 500);
        } else{
            JSONObject mainObject = new JSONObject(myResponse);
            String strSuccess = mainObject.getString("0");
            if(strSuccess.equals("")){
                Handler handler = new Handler();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        Intent intent = new Intent(VerificationActivity.this, VerifyFailedActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        startActivity(intent);
                    }
                }, 500);

            }
            else {
                Handler handler = new Handler();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        Intent intent = new Intent(VerificationActivity.this, VerifySuccessActivity.class);
                        intent.putExtra("RESPONSE",myResponse );
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        startActivity(intent);
                    }
                }, 500);
            }
        }
    }

    void run() throws IOException {

        OkHttpClient client = new OkHttpClient().newBuilder()
                .connectTimeout(10, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build();


        HttpUrl.Builder httpBuilder = HttpUrl.parse(str_url).newBuilder();
         httpBuilder.addQueryParameter("patientId",personId);
        HttpUrl httpUrl = httpBuilder.build();
        Request requesthttp = new Request.Builder()
            .addHeader("accept", "application/json")
            .url(httpUrl) // <- Finally put httpUrl in here
            .build();
        client.newCall(requesthttp).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                VerificationActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            openActivity("", "error");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });

                call.cancel();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

                final String myResponse = response.body().string();

                VerificationActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            openActivity(myResponse, "");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });

            }
        });
    }
}

package com.carrierservicetech;


import android.content.Intent;
import android.widget.Toast;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class CarrierServiceScandit extends ReactContextBaseJavaModule   {

  public CarrierServiceScandit(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "CarrierServiceScandit";
  }


  @ReactMethod
  public void barcodeScanner(String key, Callback callBack){

    ScanditActivity.setScanditAppKey(key);
    ScanditActivity.setAppCallBack(callBack);
   Intent myIntent = new Intent(getReactApplicationContext(), ScanditActivity.class);
    myIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    
    getReactApplicationContext().startActivity(myIntent);
  }

  @ReactMethod
  public void isDevSupportCalling(Callback callBack){
    PackageManager pm =  getReactApplicationContext().getPackageManager();
    boolean isSupportCall = pm.hasSystemFeature(PackageManager.FEATURE_TELEPHONY);
    callBack.invoke(isSupportCall);
  }
}

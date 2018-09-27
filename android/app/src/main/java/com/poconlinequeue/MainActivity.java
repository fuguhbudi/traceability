package com.poconlinequeue;

import android.app.Activity;
import android.os.Bundle;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import com.poconlinequeue.constant.PMConfig;

public class MainActivity extends ReactActivity {

    private Activity act;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "POCOnlineQueue";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        act = this;
        // set secure app screen flag
        if(!PMConfig.DEVELOPMENT)
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);

    }
}

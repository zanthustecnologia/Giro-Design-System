package com.zanthus.storybook

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.airbnb.android.showkase.models.Showkase
import com.zanthus.storybook.ui.theme.ZanthusTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Launch Showkase browser directly
        startActivity(Showkase.getBrowserIntent(this))
        finish()
    }
}

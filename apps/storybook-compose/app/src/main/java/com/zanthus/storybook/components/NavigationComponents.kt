package com.zanthus.storybook.components

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.airbnb.android.showkase.annotation.ShowkaseComposable

@OptIn(ExperimentalMaterial3Api::class)
@ShowkaseComposable(name = "TopAppBar", group = "Navigation")
@Composable
fun TopAppBarPreview() {
    TopAppBar(
        title = { Text("Top App Bar") },
        navigationIcon = {
            IconButton(onClick = { }) {
                Icon(Icons.Default.Menu, contentDescription = null)
            }
        },
        actions = {
            IconButton(onClick = { }) {
                Icon(Icons.Default.Search, contentDescription = null)
            }
            IconButton(onClick = { }) {
                Icon(Icons.Default.MoreVert, contentDescription = null)
            }
        }
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@ShowkaseComposable(name = "CenterAlignedTopAppBar", group = "Navigation")
@Composable
fun CenterAlignedTopAppBarPreview() {
    CenterAlignedTopAppBar(
        title = { Text("Centered") },
        navigationIcon = {
            IconButton(onClick = { }) {
                Icon(Icons.Default.ArrowBack, contentDescription = null)
            }
        }
    )
}

@ShowkaseComposable(name = "BottomAppBar", group = "Navigation")
@Composable
fun BottomAppBarPreview() {
    BottomAppBar(
        actions = {
            IconButton(onClick = { }) {
                Icon(Icons.Default.Menu, contentDescription = null)
            }
            IconButton(onClick = { }) {
                Icon(Icons.Default.Search, contentDescription = null)
            }
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { }) {
                Icon(Icons.Default.Add, contentDescription = null)
            }
        }
    )
}

@ShowkaseComposable(name = "NavigationBar", group = "Navigation")
@Composable
fun NavigationBarPreview() {
    var selectedItem by remember { mutableIntStateOf(0) }
    val items = listOf("Home", "Search", "Profile")
    val icons = listOf(Icons.Default.Home, Icons.Default.Search, Icons.Default.Person)

    NavigationBar {
        items.forEachIndexed { index, item ->
            NavigationBarItem(
                icon = { Icon(icons[index], contentDescription = null) },
                label = { Text(item) },
                selected = selectedItem == index,
                onClick = { selectedItem = index }
            )
        }
    }
}

@ShowkaseComposable(name = "NavigationRail", group = "Navigation")
@Composable
fun NavigationRailPreview() {
    var selectedItem by remember { mutableIntStateOf(0) }
    val icons = listOf(Icons.Default.Home, Icons.Default.Search, Icons.Default.Person)

    NavigationRail {
        icons.forEachIndexed { index, icon ->
            NavigationRailItem(
                icon = { Icon(icon, contentDescription = null) },
                label = { Text("Item $index") },
                selected = selectedItem == index,
                onClick = { selectedItem = index }
            )
        }
    }
}

@ShowkaseComposable(name = "TabRow", group = "Navigation")
@Composable
fun TabRowPreview() {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf("Tab 1", "Tab 2", "Tab 3")

    TabRow(selectedTabIndex = selectedTab) {
        tabs.forEachIndexed { index, title ->
            Tab(
                text = { Text(title) },
                selected = selectedTab == index,
                onClick = { selectedTab = index }
            )
        }
    }
}

@ShowkaseComposable(name = "ScrollableTabRow", group = "Navigation")
@Composable
fun ScrollableTabRowPreview() {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf("Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5")

    ScrollableTabRow(selectedTabIndex = selectedTab) {
        tabs.forEachIndexed { index, title ->
            Tab(
                text = { Text(title) },
                selected = selectedTab == index,
                onClick = { selectedTab = index }
            )
        }
    }
}

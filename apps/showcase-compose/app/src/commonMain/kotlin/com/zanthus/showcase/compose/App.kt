package com.zanthus.showcase.compose

import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.DarkMode
import androidx.compose.material.icons.outlined.LightMode
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.zanthus.components.GiroCenterAlignedTopAppBar
import com.zanthus.components.GiroPreviewSurface
import com.zanthus.components.GiroScaffold
import com.zanthus.components.GiroTheme
import com.zanthus.showcase.compose.model.CatalogSection
import com.zanthus.showcase.compose.stories.composeCatalogSections

@Composable
fun GiroShowcaseApp() {
    var darkTheme by remember { mutableStateOf(false) }
    val sections = remember { composeCatalogSections() }
    var selectedSectionIndex by remember { mutableIntStateOf(0) }
    var selectedStoryIndex by remember { mutableIntStateOf(0) }

    GiroTheme(darkTheme = darkTheme) {
        GiroScaffold(
            topBar = {
                GiroCenterAlignedTopAppBar(
                    title = {
                        Column {
                            Text("Giro Compose Showcase", fontWeight = FontWeight.SemiBold)
                            Text(
                                "Biblioteca Compose Multiplatform do design system",
                                style = MaterialTheme.typography.bodySmall,
                            )
                        }
                    },
                    actions = {
                        IconButton(onClick = { darkTheme = !darkTheme }) {
                            Icon(
                                imageVector = if (darkTheme) Icons.Outlined.LightMode else Icons.Outlined.DarkMode,
                                contentDescription = "Alternar tema",
                            )
                        }
                    },
                )
            },
        ) { padding ->
            CatalogLayout(
                sections = sections,
                selectedSectionIndex = selectedSectionIndex,
                selectedStoryIndex = selectedStoryIndex,
                onSelectSection = {
                    selectedSectionIndex = it
                    selectedStoryIndex = 0
                },
                onSelectStory = { selectedStoryIndex = it },
                padding = padding,
            )
        }
    }
}

@Composable
private fun CatalogLayout(
    sections: List<CatalogSection>,
    selectedSectionIndex: Int,
    selectedStoryIndex: Int,
    onSelectSection: (Int) -> Unit,
    onSelectStory: (Int) -> Unit,
    padding: PaddingValues,
) {
    val selectedSection = sections[selectedSectionIndex]

    BoxWithConstraints(
        modifier = Modifier
            .fillMaxSize()
            .padding(padding),
    ) {
        val isCompact = maxWidth < 980.dp

        if (isCompact) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
            ) {
                SectionChips(
                    sections = sections,
                    selectedSectionIndex = selectedSectionIndex,
                    onSelectSection = onSelectSection,
                )
                StoryList(
                    section = selectedSection,
                    selectedStoryIndex = selectedStoryIndex,
                    onSelectStory = onSelectStory,
                    modifier = Modifier.fillMaxWidth(),
                )
                StoryPreview(section = selectedSection, storyIndex = selectedStoryIndex)
            }
        } else {
            Row(modifier = Modifier.fillMaxSize()) {
                Column(
                    modifier = Modifier
                        .fillMaxHeight()
                        .width(320.dp)
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp),
                ) {
                    SectionChips(
                        sections = sections,
                        selectedSectionIndex = selectedSectionIndex,
                        onSelectSection = onSelectSection,
                    )
                    StoryList(
                        section = selectedSection,
                        selectedStoryIndex = selectedStoryIndex,
                        onSelectStory = onSelectStory,
                        modifier = Modifier.fillMaxSize(),
                    )
                }
                Spacer(modifier = Modifier.width(8.dp))
                StoryPreview(
                    section = selectedSection,
                    storyIndex = selectedStoryIndex,
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxHeight()
                        .padding(16.dp),
                )
            }
        }
    }
}

@Composable
private fun SectionChips(
    sections: List<CatalogSection>,
    selectedSectionIndex: Int,
    onSelectSection: (Int) -> Unit,
) {
    FlowRow(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        sections.forEachIndexed { index, section ->
            AssistChip(
                onClick = { onSelectSection(index) },
                label = {
                    Text(if (index == selectedSectionIndex) "${section.title} •" else section.title)
                },
            )
        }
    }
}

@Composable
private fun StoryList(
    section: CatalogSection,
    selectedStoryIndex: Int,
    onSelectStory: (Int) -> Unit,
    modifier: Modifier = Modifier,
) {
    Card(modifier = modifier) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(section.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            Text(section.description, style = MaterialTheme.typography.bodyMedium)
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                section.stories.forEachIndexed { index, story ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onSelectStory(index) },
                    ) {
                        Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(
                                story.title,
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = if (index == selectedStoryIndex) FontWeight.SemiBold else FontWeight.Medium,
                            )
                            Text(story.description, style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun StoryPreview(
    section: CatalogSection,
    storyIndex: Int,
    modifier: Modifier = Modifier,
) {
    val story = section.stories[storyIndex.coerceIn(0, section.stories.lastIndex)]

    Card(modifier = modifier.fillMaxWidth()) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            Text(story.title, style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.SemiBold)
            Text(story.description, style = MaterialTheme.typography.bodyLarge)
            GiroPreviewSurface(modifier = Modifier.fillMaxWidth()) {
                story.content()
            }
        }
    }
}

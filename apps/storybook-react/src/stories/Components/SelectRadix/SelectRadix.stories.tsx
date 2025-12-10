import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { SelectRadix } from '@giro-ds/react';
import type { SelectRadixProps } from '@giro-ds/react';
import { 
  Channel16Regular, 
  Globe16Regular, 
  Home16Regular, 
  Settings16Regular,
  Person16Regular 
} from '@fluentui/react-icons';

export default {
  title: 'Components/SelectRadix',
  component: SelectRadix,
  parameters: {
    controls: {
      sort: 'alpha',
    },
    layout: 'centered',
  },
  argTypes: {
    items: {
      control: { type: 'object' },
    },
    variant: {
      control: { type: 'select' },
      options: ['text', 'icon', 'checkbox'],
    },
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    helperText: {
      control: { type: 'text' },
    },
    errorMessage: {
      control: { type: 'text' },
    },
    search: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    value: {
      table: {
        disable: true,
      },
    },
    onValueChange: {
      table: {
        disable: true,
      },
    },
    enableInfiniteScroll: {
      table: {
        disable: true,
      },
    },
    onScrollEnd: {
      table: {
        disable: true,
      },
    },
    isLoadingMore: {
      table: {
        disable: true,
      },
    },
    enableApiSearch: {
      table: {
        disable: true,
      },
    },
    onApiSearch: {
      table: {
        disable: true,
      },
    },
    isSearching: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<SelectRadixProps>;

// Data sets
const textOnlyItems = [
  { id: '1', value: 'react', text: 'React' },
  { id: '2', value: 'vue', text: 'Vue' },
  { id: '3', value: 'angular', text: 'Angular' },
  { id: '4', value: 'svelte', text: 'Svelte' },
  { id: '5', value: 'ember', text: 'Ember', disabled: true },
];

const textTwoLinesItems = [
  { id: '1', value: 'react', text: 'React', subTitle: 'A JavaScript library for building UIs' },
  { id: '2', value: 'vue', text: 'Vue', subTitle: 'The Progressive JavaScript Framework' },
  { id: '3', value: 'angular', text: 'Angular', subTitle: 'Platform for building mobile and desktop apps' },
  { id: '4', value: 'svelte', text: 'Svelte', subTitle: 'Cybernetically enhanced web apps' },
  { id: '5', value: 'ember', text: 'Ember', subTitle: 'A framework for ambitious developers', disabled: true },
];

const iconItems = [
  { id: '1', value: 'global', text: 'Global Settings', icon: <Globe16Regular /> },
  { id: '2', value: 'home', text: 'Home', icon: <Home16Regular /> },
  { id: '3', value: 'profile', text: 'Profile', icon: <Person16Regular /> },
  { id: '4', value: 'settings', text: 'Settings', icon: <Settings16Regular /> },
  { id: '5', value: 'channels', text: 'Channels', icon: <Channel16Regular />, disabled: true },
];

const iconTwoLinesItems = [
  { id: '1', value: 'global', text: 'Global Settings', subTitle: 'Manage system preferences', icon: <Globe16Regular /> },
  { id: '2', value: 'home', text: 'Home', subTitle: 'Return to dashboard', icon: <Home16Regular /> },
  { id: '3', value: 'profile', text: 'Profile', subTitle: 'Edit your profile information', icon: <Person16Regular /> },
  { id: '4', value: 'settings', text: 'Settings', subTitle: 'Configure application settings', icon: <Settings16Regular /> },
  { id: '5', value: 'channels', text: 'Channels', subTitle: 'Manage communication channels', icon: <Channel16Regular />, disabled: true },
];

const checkboxItems = [
  { id: '1', value: 'typescript', text: 'TypeScript' },
  { id: '2', value: 'javascript', text: 'JavaScript' },
  { id: '3', value: 'python', text: 'Python' },
  { id: '4', value: 'java', text: 'Java' },
  { id: '5', value: 'csharp', text: 'C#' },
  { id: '6', value: 'go', text: 'Go', disabled: true },
];

const checkboxTwoLinesItems = [
  { id: '1', value: 'typescript', text: 'TypeScript', subTitle: 'Typed superset of JavaScript' },
  { id: '2', value: 'javascript', text: 'JavaScript', subTitle: 'Dynamic programming language' },
  { id: '3', value: 'python', text: 'Python', subTitle: 'High-level programming language' },
  { id: '4', value: 'java', text: 'Java', subTitle: 'Object-oriented programming language' },
  { id: '5', value: 'csharp', text: 'C#', subTitle: 'Modern object-oriented language' },
  { id: '6', value: 'go', text: 'Go', subTitle: 'Statically typed, compiled language', disabled: true },
];

// Default/Playground
const Template: StoryFn<SelectRadixProps> = (args) => <SelectRadix {...args} />;

export const Default = Template.bind({});

Default.args = {
  items: textOnlyItems,
  variant: 'text',
  label: 'Framework',
  placeholder: 'Select a framework',
  helperText: 'Choose your preferred framework',
  search: false,
  required: false,
  disabled: false,
};

// Variants
export const Variants: StoryFn<SelectRadixProps> = () => (
  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
    <div style={{ width: 300 }}>
      <SelectRadix
        items={textOnlyItems}
        variant="text"
        label="Text Only"
        placeholder="Select a framework"
      />
    </div>
    <div style={{ width: 300 }}>
      <SelectRadix
        items={iconItems}
        variant="icon"
        label="With Icon"
        placeholder="Select a page"
      />
    </div>
    <div style={{ width: 300 }}>
      <SelectRadix
        items={checkboxItems}
        variant="checkbox"
        label="Multi-select"
        placeholder="Select languages"
      />
    </div>
  </div>
);

export const WithIcon: StoryFn<SelectRadixProps> = () => (
  <SelectRadix
    items={iconItems}
    variant="icon"
    label="Navigation"
    placeholder="Select a page"
  />
);

export const WithCheckbox: StoryFn<SelectRadixProps> = () => (
  <SelectRadix
    items={checkboxItems}
    variant="checkbox"
    label="Programming Languages"
    placeholder="Select languages"
  />
);

// Features
export const TwoLines: StoryFn<SelectRadixProps> = () => (
  <SelectRadix
    items={textTwoLinesItems}
    variant="text"
    label="Framework"
    placeholder="Select a framework"
  />
);

export const WithSearch: StoryFn<SelectRadixProps> = () => (
  <SelectRadix
    items={textOnlyItems}
    variant="text"
    label="Framework"
    placeholder="Search frameworks..."
    search={true}
  />
);

export const WithHelperText: StoryFn<SelectRadixProps> = () => (
  <SelectRadix
    items={textOnlyItems}
    variant="text"
    label="Framework"
    placeholder="Select a framework"
    helperText="Choose your preferred JavaScript framework"
  />
);

// States
export const Required: StoryFn<SelectRadixProps> = () => (
  <SelectRadix
    items={textOnlyItems}
    variant="text"
    label="Framework"
    placeholder="Select a framework"
    required={true}
    helperText="This field is required"
  />
);

export const Disabled: StoryFn<SelectRadixProps> = () => (
  <SelectRadix
    items={textOnlyItems}
    variant="text"
    label="Framework"
    placeholder="Select a framework"
    disabled={true}
    value="react"
  />
);

export const WithError: StoryFn<SelectRadixProps> = () => {
  const [value, setValue] = React.useState('');
  
  return (
    <SelectRadix 
      items={textOnlyItems}
      variant="text"
      label="Framework"
      placeholder="Select a framework"
      required={true}
      errorMessage="Please select a framework"
      value={value}
      onValueChange={(val) => setValue(val as string)}
    />
  );
};

// Advanced features
export const InfiniteScroll: StoryFn<SelectRadixProps> = () => {
  const [items, setItems] = React.useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: `item-${i + 1}`,
      value: `item-${i + 1}`,
      text: `Item ${i + 1}`,
      subTitle: `Description for item ${i + 1}`,
    }))
  );
  
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const handleScrollEnd = React.useCallback(() => {
    if (!hasMore || isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    setTimeout(() => {
      const newPage = page + 1;
      const newItems = Array.from({ length: 10 }, (_, i) => {
        const itemNumber = page * 20 + i + 1;
        return {
          id: `item-${itemNumber}`,
          value: `item-${itemNumber}`,
          text: `Item ${itemNumber}`,
          subTitle: `Description for item ${itemNumber}`,
        };
      });
      
      setItems(prev => [...prev, ...newItems]);
      setPage(newPage);
      setIsLoadingMore(false);
      
      if (newPage >= 5) {
        setHasMore(false);
      }
    }, 1000);
  }, [page, hasMore, isLoadingMore]);

  return (
    <>
      <SelectRadix
        items={items}
        variant="text"
        label="Infinite Scroll Example"
        placeholder="Select an item..."
        search
        enableInfiniteScroll={hasMore}
        onScrollEnd={handleScrollEnd}
        isLoadingMore={isLoadingMore}
      />
      <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        Total items: {items.length} | Page: {page} | Has more: {hasMore ? 'Yes' : 'No'}
      </p>
    </>
  );
};

export const ApiSearch: StoryFn<SelectRadixProps> = () => {
  const [items, setItems] = React.useState([
    { id: '1', value: '1', text: 'Item 1', subTitle: 'Initial result' },
    { id: '2', value: '2', text: 'Item 2', subTitle: 'Initial result' },
    { id: '3', value: '3', text: 'Item 3', subTitle: 'Initial result' },
  ]);
  
  const [isSearching, setIsSearching] = React.useState(false);
  const [lastSearchTerm, setLastSearchTerm] = React.useState('');

  const handleApiSearch = React.useCallback((term: string) => {
    setLastSearchTerm(term);
    setIsSearching(true);
    
    setTimeout(() => {
      if (term === '') {
        setItems([
          { id: '1', value: '1', text: 'Item 1', subTitle: 'Initial result' },
          { id: '2', value: '2', text: 'Item 2', subTitle: 'Initial result' },
          { id: '3', value: '3', text: 'Item 3', subTitle: 'Initial result' },
        ]);
      } else {
        const searchResults = Array.from({ length: 5 }, (_, i) => ({
          id: `search-${i + 1}`,
          value: `search-${i + 1}`,
          text: `${term} - Result ${i + 1}`,
          subTitle: `Found via API for "${term}"`,
        }));
        
        setItems(searchResults);
      }
      
      setIsSearching(false);
    }, 800);
  }, []);

  return (
    <>
      <SelectRadix
        items={items}
        variant="text"
        label="API Search Example"
        placeholder="Type to search..."
        search
        enableApiSearch={true}
        onApiSearch={handleApiSearch}
        isSearching={isSearching}
      />
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        <p><strong>Status:</strong> {isSearching ? 'Searching...' : 'Ready'}</p>
        <p><strong>Last search term:</strong> {lastSearchTerm || 'None'}</p>
        <p><strong>Total results:</strong> {items.length}</p>
        <p><strong>Tip:</strong> Type something to see the API search in action!</p>
      </div>
    </>
  );
};

import React from 'react';
import { Button } from './';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'radio',
      options: ['darkNavy', 'bluePrimary', 'blueSecondary', 'blueNormal'],
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },

    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    className: {},
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'bluePrimary',
    className: '',
    children: '버튼',
  },
};

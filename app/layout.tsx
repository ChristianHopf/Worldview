import '@mantine/core/styles.css';

import React from 'react';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  ColorSchemeScript,
  Flex,
  mantineHtmlProps,
  MantineProvider,
  Text,
  Title,
} from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { theme } from '../theme';

export const metadata = {
  title: 'Worldview',
  description: 'Minecraft server management dashboard',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShell
            header={{ height: 60 }}
            // navbar={{
            //   width: 300,
            //   breakpoint: 'sm',
            // }}
            padding="md"
          >
            <AppShellHeader>
              <Flex
                align="center"
                justify="space-between"
                style={{ height: '100%', padding: '0 16px' }}
              >
                <Title fw={700} order={1} style={{ textAlign: 'center' }}>
                  Worldview
                </Title>
                <ColorSchemeToggle />
              </Flex>
            </AppShellHeader>
            {/* <AppShellNavbar p="md">Navbar</AppShellNavbar> */}
            <AppShellMain>{children}</AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}

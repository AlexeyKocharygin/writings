import React, { ReactElement } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { OopsPage } from './components/pages/OopsPage';
import { WritingPage } from './components/pages/WritingPage';
import { WritingsPage } from './components/pages/WritingsPage';
import { useTouchEvents } from './hooks/useTouchEvents';
import { Route } from './components/Route';
import { Page } from './components/Page';
import { useSavedScroll } from './hooks/useSavedScroll';
import { useTheme } from './hooks/useTheme';
import { useLang } from './hooks/useLang';

export const App = (): ReactElement => {
    useTouchEvents();
    useSavedScroll();
    useTheme();
    useLang();

    return (
        <ErrorBoundary
            fallback={
                <Page opened>
                    <OopsPage />
                </Page>
            }
        >
            <Route path="/">
                <Page>
                    <WritingsPage />
                </Page>
            </Route>
            <Route path="/writings/:writingId">
                <Page>
                    <WritingPage />
                </Page>
            </Route>
        </ErrorBoundary>
    );
};

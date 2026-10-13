import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@/src/config/routes';
import type { NavigateFn, NavigationTarget, RoutePath } from '@/src/types/navigation';

const isRoutePath = (target: NavigationTarget): target is RoutePath => target.startsWith('/');

/** Resolves a page id or route path to an absolute route path. */
export const resolveRoute = (target: NavigationTarget): RoutePath =>
  isRoutePath(target) ? target : PAGE_ROUTES[target];

/**
 * Typed navigation for pages: accepts a logical `PageId` or an absolute `RoutePath`
 * and always navigates to an absolute route (never a relative one).
 */
export const useAppNavigation = (): NavigateFn => {
  const navigate = useNavigate();
  return useCallback<NavigateFn>((target) => navigate(resolveRoute(target)), [navigate]);
};


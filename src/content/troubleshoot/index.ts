import type { Platform } from '@/schemas';
import { intune } from './intune';
import { workspaceone } from './workspaceone';

/** Single registry: add a platform file here and it gets a nav entry and a page. */
export const platforms: readonly Platform[] = [workspaceone, intune];

export const troubleshootHref = (id: string) => `#/troubleshoot/${id}`;

export const getPlatform = (id: string | undefined) => platforms.find((p) => p.id === id);

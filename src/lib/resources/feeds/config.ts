import fs from 'fs';
import type { FeedDetails } from './models';
import YAML from 'yaml';

const file = fs.readFileSync('./config/feeds.yml', 'utf8');
export const feedSources = YAML.parse(file) as Record<string, FeedDetails[]>;

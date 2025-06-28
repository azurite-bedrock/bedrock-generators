import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetWallDefinition extends BlockSetBaseDefinition {}

export function createWall(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetWallDefinition,
    blocksIO: BlockJsonIO
) {
    // This function is not implemented yet, but it should create a wall block definition.
}

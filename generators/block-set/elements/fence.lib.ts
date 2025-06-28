import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetFenceDefinition extends BlockSetBaseDefinition {}

export function createFence(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetFenceDefinition,
    blocksIO: BlockJsonIO
) {
    // This function is not implemented yet, but it should create a fence block definition.
}

import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetButtonDefinition extends BlockSetBaseDefinition {}

export function createButton(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetButtonDefinition,
    blocksIO: BlockJsonIO
) {
    // This function is not implemented yet, but it should create a button block definition.
}

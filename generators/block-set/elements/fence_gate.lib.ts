import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetFenceGateDefinition extends BlockSetBaseDefinition {}

export function createFenceGate(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetFenceGateDefinition,
    blocksIO: BlockJsonIO
) {
    // This function is not implemented yet, but it should create a fence gate block definition.
}

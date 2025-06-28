import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetDoorDefinition extends BlockSetBaseDefinition {}

export function createDoor(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetDoorDefinition,
    blocksIO: BlockJsonIO
) {
    // This function is not implemented yet, but it should create a door block definition.
}

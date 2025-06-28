import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetPressurePlateDefinition extends BlockSetBaseDefinition {}

export function createPressurePlate(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetPressurePlateDefinition,
    blocksIO: BlockJsonIO
) {
    // This function is not implemented yet, but it should create a pressure plate block definition.
}

import { walk } from 'jsr:@std/fs';
import { basename } from 'jsr:@std/path@^1.0.8/basename';
import { fromFileUrl } from 'jsr:@std/path@^1.0.8/from-file-url';
import { BlockSetLogDefinition, createLog } from './elements/log.lib.ts';
import { BlockSetWoodDefinition, createWood } from './elements/wood.lib.ts';
import { BlockSetLeavesDefinition, createLeaves } from './elements/leaves.lib.ts';
import { BlockSetPlanksDefinition, createPlanks } from './elements/planks.lib.ts';
import { BlockSetSlabDefinition, createSlab } from './elements/slab.lib.ts';
import { BlockSetStairsDefinition, createStairs } from './elements/stairs.lib.ts';
import { BlockSetFenceDefinition, createFence } from './elements/fence.lib.ts';
import { BlockSetFenceGateDefinition, createFenceGate } from './elements/fence_gate.lib.ts';
import { BlockSetWallDefinition, createWall } from './elements/wall.lib.ts';
import { BlockSetDoorDefinition, createDoor } from './elements/door.lib.ts';
import { BlockSetTrapdoorDefinition, createTrapdoor } from './elements/trapdoor.lib.ts';
import { BlockSetButtonDefinition, createButton } from './elements/button.lib.ts';
import {
    BlockSetPressurePlateDefinition,
    createPressurePlate,
} from './elements/pressure_plate.lib.ts';
import { BlockJsonIO } from '../../lib/block-json.lib.ts';
import { join } from 'jsr:@std/path@^1.0.8/join';

const FILE_NAME = basename(fromFileUrl(import.meta.url));

interface BlockSetDefinition {
    format_version: '1.0';
    'azur:block_set': {
        description: { namespace: string; prefix: string };
        elements: {
            'azur:base'?: BlockSetBaseDefinition & {
                add_to_category: boolean;
                identifier: string;
            };
            'azur:log'?: BlockSetLogDefinition;
            'azur:wood'?: BlockSetWoodDefinition;
            'azur:leaves'?: BlockSetLeavesDefinition;
            'azur:planks'?: BlockSetPlanksDefinition;
            'azur:slab'?: BlockSetSlabDefinition;
            'azur:stairs'?: BlockSetStairsDefinition;
            'azur:fence'?: BlockSetFenceDefinition;
            'azur:fence_gate'?: BlockSetFenceGateDefinition;
            'azur:wall'?: BlockSetWallDefinition;
            'azur:door'?: BlockSetDoorDefinition;
            'azur:trapdoor'?: BlockSetTrapdoorDefinition;
            'azur:button'?: BlockSetButtonDefinition;
            'azur:pressure_plate'?: BlockSetPressurePlateDefinition;
        };
    };
}

export interface BlockSetBaseDefinition {
    texture: { '*': string } | { '*': string; up: string; down: string };
    add_to_category: boolean | string;
    add_to_group: boolean | string;
}

export async function handleBlockSetDefinition(path: string): Promise<void> {
    Deno.chdir(Deno.env.get('MARATHON_ROOT_DIR')!);

    for await (const file of walk(path, {
        includeDirs: false,
        exts: ['.json'],
    })) {
        const set: BlockSetDefinition = JSON.parse(Deno.readTextFileSync(file.path));

        const identifier = {
            description: set['azur:block_set'].description,
            name: file.name.replace(/\.[^/.]+$/, ''),
        };
        const elements = set['azur:block_set'].elements;
        const blocksIO = new BlockJsonIO(join(Deno.env.get('MARATHON_RP_DIR')!, 'blocks.json'));

        console.info(`[${FILE_NAME}] Generating ${identifier.name} block-set`);

        Deno.mkdirSync(
            `BP/blocks/${identifier.description.namespace}/block_set/${identifier.name}/`,
            { recursive: true }
        );

        blocksIO.load();

        // if (elements['azur:log'] !== undefined)
        //     createLog(identifier, elements['azur:log'], blocksIO);
        // if (elements['azur:wood'] !== undefined)
        //     createWood(identifier, elements['azur:wood'], blocksIO);
        // if (elements['azur:leaves'] !== undefined)
        //     createLeaves(identifier, elements['azur:leaves'], blocksIO);
        // if (elements['azur:planks'] !== undefined)
        //     createPlanks(identifier, elements['azur:planks'], blocksIO);
        if (elements['azur:slab'] !== undefined)
            createSlab(identifier, elements['azur:slab'], blocksIO);
        // if (elements['azur:stairs'] !== undefined)
        //     createStairs(identifier, elements['azur:stairs'], blocksIO);
        // if (elements['azur:fence'] !== undefined)
        //     createFence(identifier, elements['azur:fence'], blocksIO);
        // if (elements['azur:fence_gate'] !== undefined)
        //     createFenceGate(identifier, elements['azur:fence_gate'], blocksIO);
        // if (elements['azur:wall'] !== undefined)
        //     createWall(identifier, elements['azur:wall'], blocksIO);
        // if (elements['azur:door'] !== undefined)
        //     createDoor(identifier, elements['azur:door'], blocksIO);
        if (elements['azur:trapdoor'] !== undefined)
            createTrapdoor(identifier, elements['azur:trapdoor'], blocksIO);
        // if (elements['azur:button'] !== undefined)
        //     createButton(identifier, elements['azur:button'], blocksIO);
        // if (elements['azur:pressure_plate'] !== undefined)
        //     createPressurePlate(identifier, elements['azur:pressure_plate'], blocksIO);

        blocksIO.save();
    }
}

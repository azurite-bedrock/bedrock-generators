import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetLogDefinition extends BlockSetBaseDefinition {
    texture: { '*': string; up: string; down: string };
    strippable?: { block: string } | { texture: { '*': string; up: string; down: string } };
}

export function createLog(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetLogDefinition,
    blocksIO: BlockJsonIO
) {
    Deno.writeTextFileSync(
        `BP/blocks/azur/block_set/${id.name}/log.json`,
        JSON.stringify(createLogBlockDefinition(id, def, blocksIO))
    );

    if (def.strippable !== undefined && 'texture' in def.strippable) {
        Deno.writeTextFileSync(
            `BP/blocks/azur/block_set/${id.name}/stripped_log.json`,
            JSON.stringify(createStrippedLogBlockDefinition(id, def, blocksIO))
        );
    }
}

const createLogBlockDefinition = (
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetLogDefinition,
    blocksIO: BlockJsonIO
) => {
    const components: Record<string, object> = {
        'minecraft:material_instances': def.texture,
        'minecraft:flammable': {},
        'minecraft:destructible_by_mining': {
            seconds_to_destroy: 3,
        },
        'minecraft:geometry': {
            identifier: 'minecraft:geometry.full_block',
        },
        'tag:wood': {},
        'tag:minecraft:is_hatchet_item_destructible': {},
        'tag:minecraft:logs': {},
        'tag:minecraft:logs_that_burn': {},
    };

    if (def.strippable !== undefined)
        components['azur:strippable'] = {
            target_block:
                'block' in def.strippable
                    ? def.strippable.block
                    : `${id.description.namespace}:stripped_${id.description.prefix}_log`,
        };

    const permutations = [
        {
            condition:
                "q.block_state('minecraft:block_face') == 'west' || q.block_state('minecraft:block_face') == 'east'",
            components: {
                'minecraft:transformation': { rotation: [0, 0, 90] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:block_face') == 'down' || q.block_state('minecraft:block_face') == 'up'",
            components: {
                'minecraft:transformation': { rotation: [0, 0, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:block_face') == 'north' || q.block_state('minecraft:block_face') == 'south'",
            components: {
                'minecraft:transformation': { rotation: [90, 0, 0] },
            },
        },
    ];

    blocksIO.set(`${id.description.namespace}:${id.description.prefix}_log`, { sound: 'wood' });

    return {
        format_version: '1.21.70',
        'minecraft:block': {
            description: {
                identifier: `${id.description.namespace}:${id.description.prefix}_log`,
                menu_category: {
                    category:
                        def.add_to_category === true
                            ? 'nature'
                            : def.add_to_category === false
                            ? 'none'
                            : def.add_to_category,
                    group:
                        def.add_to_group === true
                            ? 'minecraft:itemGroup.name.log'
                            : def.add_to_group === false
                            ? undefined
                            : def.add_to_group,
                },
                traits: {
                    'minecraft:placement_position': {
                        enabled_states: ['minecraft:block_face'],
                    },
                },
            },
            components,
            permutations,
        },
    };
};

const createStrippedLogBlockDefinition = (
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetLogDefinition,
    blocksIO: BlockJsonIO
) => {
    const components: Record<string, object> = {
        'minecraft:material_instances':
            'texture' in def.strippable! ? def.strippable!.texture : {},
        'minecraft:flammable': {},
        'minecraft:destructible_by_mining': {
            seconds_to_destroy: 3,
        },
        'minecraft:geometry': {
            identifier: 'minecraft:geometry.full_block',
        },
        'tag:wood': {},
        'tag:minecraft:is_hatchet_item_destructible': {},
        'tag:minecraft:logs': {},
        'tag:minecraft:logs_that_burn': {},
    };

    const permutations = [
        {
            condition:
                "q.block_state('minecraft:block_face') == 'west' || q.block_state('minecraft:block_face') == 'east'",
            components: {
                'minecraft:transformation': { rotation: [0, 0, 90] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:block_face') == 'down' || q.block_state('minecraft:block_face') == 'up'",
            components: {
                'minecraft:transformation': { rotation: [0, 0, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:block_face') == 'north' || q.block_state('minecraft:block_face') == 'south'",
            components: {
                'minecraft:transformation': { rotation: [90, 0, 0] },
            },
        },
    ];

    blocksIO.set(`${id.description.namespace}:stripped_${id.description.prefix}_log`, {
        sound: 'wood',
    });

    return {
        format_version: '1.21.70',
        'minecraft:block': {
            description: {
                identifier: `${id.description.namespace}:stripped_${id.description.prefix}_log`,
                menu_category: {
                    category:
                        def.add_to_category === true
                            ? 'nature'
                            : def.add_to_category === false
                            ? 'none'
                            : def.add_to_category,
                    group:
                        def.add_to_group === true
                            ? 'minecraft:itemGroup.name.log'
                            : def.add_to_group === false
                            ? undefined
                            : def.add_to_group,
                },
                traits: {
                    'minecraft:placement_position': {
                        enabled_states: ['minecraft:block_face'],
                    },
                },
            },
            components,
            permutations,
        },
    };
};

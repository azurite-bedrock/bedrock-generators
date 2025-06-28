import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetTrapdoorDefinition extends BlockSetBaseDefinition {
    texture: { '*': string };
}

export function createTrapdoor(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetTrapdoorDefinition,
    blocksIO: BlockJsonIO
) {
    Deno.writeTextFileSync(
        `BP/blocks/azur/block_set/${id.name}/trapdoor.json`,
        JSON.stringify(createTrapdoorBlockDefinition(id, def, blocksIO))
    );
}

function createTrapdoorBlockDefinition(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetTrapdoorDefinition,
    blocksIO: BlockJsonIO
) {
    const components = {
        'minecraft:collision_box': {
            origin: [-8, 0, -8],
            size: [16, 3, 16],
        },
        'minecraft:selection_box': {
            origin: [-8, 0, -8],
            size: [16, 3, 16],
        },
        'minecraft:destructible_by_mining': {
            seconds_to_destroy: 0.5,
        },
        'minecraft:flammable': {
            catch_chance_modifier: 5,
            destroy_chance_modifier: 20,
        },
        'minecraft:geometry': 'geometry.azur.trapdoor',
        'minecraft:material_instances': def.texture,

        'azur:trapdoor': {},
    };

    const permutations = [
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'north' && !q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [0, 0, 180] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'south' && !q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [180, 0, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'east' && !q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [180, -270, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'west' && !q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [180, 270, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [-270, 0, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [270, 0, -180] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [0, 270, 90] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:open')",
            components: {
                'minecraft:transformation': {
                    rotation: [180, -270, -270],
                },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'north' && !q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [0, 0, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'south' && !q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [0, 180, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'east' && !q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [0, 270, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'west' && !q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [0, -270, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [90, 0, 180] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [270, 0, 0] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [0, -270, 90] },
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:open')",
            components: {
                'minecraft:transformation': { rotation: [180, 270, -270] },
            },
        },
    ];

    blocksIO.set(`${id.description.namespace}:${id.description.prefix}_trapdoor`, {
        sound: 'wood',
    });

    return {
        format_version: '1.21.70',
        'minecraft:block': {
            description: {
                identifier: `${id.description.namespace}:${id.description.prefix}_trapdoor`,
                menu_category: {
                    category:
                        def.add_to_category === true
                            ? 'construction'
                            : def.add_to_category === false
                            ? 'none'
                            : def.add_to_category,
                    group:
                        def.add_to_group === true
                            ? 'minecraft:itemGroup.name.trapdoor'
                            : def.add_to_group === false
                            ? undefined
                            : def.add_to_group,
                },
                traits: {
                    'minecraft:placement_position': {
                        enabled_states: ['minecraft:vertical_half'],
                    },
                    'minecraft:placement_direction': {
                        enabled_states: ['minecraft:cardinal_direction'],
                    },
                },
                states: {
                    'azur:open': [false, true],
                },
            },
            components,
            permutations,
        },
    };
}

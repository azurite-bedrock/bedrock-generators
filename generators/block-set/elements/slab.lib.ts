import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetSlabDefinition extends BlockSetBaseDefinition {}

export function createSlab(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetSlabDefinition,
    blocksIO: BlockJsonIO
) {
    Deno.writeTextFileSync(
        `BP/blocks/${id.description.namespace}/block_set/${id.name}/slab.json`,
        JSON.stringify(createSlabBlockDefinition(id, def, blocksIO))
    );
}

function createSlabBlockDefinition(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetSlabDefinition,
    blocksIO: BlockJsonIO
) {
    const components = {
        'minecraft:destructible_by_mining': {
            seconds_to_destroy: 7,
        },
        'minecraft:destructible_by_explosion': {
            explosion_resistance: 6,
        },
        'minecraft:item_visual': {
            geometry: {
                identifier: `geometry.${id.description.namespace}.slab`,
                bone_visibility: {
                    top: false,
                    bot: true,
                },
            },
            material_instances: def.texture,
        },
        'minecraft:material_instances': def.texture,

        'minecraft:geometry': {
            identifier: `geometry.${id.description.namespace}.slab`,
            bone_visibility: {
                bot: "q.block_state('minecraft:vertical_half') == 'bottom'",
                top: "q.block_state('minecraft:vertical_half') == 'top'",
            },
        },

        [`${id.description.namespace}:slab`]: {},
    };

    const permutations = [
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && !q.block_state('${id.description.prefix}:double')",
            components: {
                'minecraft:collision_box': {
                    origin: [-8, 0, -8],
                    size: [16, 8, 16],
                },
                'minecraft:selection_box': {
                    origin: [-8, 0, -8],
                    size: [16, 8, 16],
                },
            },
        },
        {
            condition: `q.block_state('minecraft:vertical_half') == 'top' && !q.block_state('${id.description.namespace}:double')`,
            components: {
                'minecraft:collision_box': {
                    origin: [-8, 8, -8],
                    size: [16, 8, 16],
                },
                'minecraft:selection_box': {
                    origin: [-8, 8, -8],
                    size: [16, 8, 16],
                },
            },
        },
        {
            condition: `q.block_state('${id.description.namespace}:double')`,
            components: {
                'minecraft:geometry': {
                    identifier: 'minecraft:geometry.full_block',
                },
                'minecraft:collision_box': { origin: [-8, 0, -8], size: [16, 16, 16] },
                'minecraft:selection_box': { origin: [-8, 0, -8], size: [16, 16, 16] },
            },
        },
    ];

    blocksIO.set(`${id.description.namespace}:${id.description.prefix}_slab`, {
        sound: 'wood',
    });

    return {
        format_version: '1.21.70',
        'minecraft:block': {
            description: {
                identifier: `${id.description.namespace}:${id.description.prefix}_slab`,
                menu_category: {
                    category:
                        def.add_to_category === true
                            ? 'construction'
                            : def.add_to_category === false
                            ? 'none'
                            : def.add_to_category,
                    group:
                        def.add_to_group === true
                            ? 'minecraft:itemGroup.name.slab'
                            : def.add_to_group === false
                            ? undefined
                            : def.add_to_group,
                },
                traits: {
                    'minecraft:placement_position': {
                        enabled_states: ['minecraft:vertical_half'],
                    },
                },
                states: {
                    [`${id.description.namespace}:double`]: [false, true],
                },
            },
            components,
            permutations,
        },
    };
}

import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetStairsDefinition extends BlockSetBaseDefinition {
    texture: { '*': string };
}

export function createStairs(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetStairsDefinition,
    blocksIO: BlockJsonIO
) {
    Deno.writeTextFileSync(
        `BP/blocks/azur/block_set/${id.name}/stairs.json`,
        JSON.stringify(createStairsBlockDefinition(id, def, blocksIO))
    );
}

function createStairsBlockDefinition(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetStairsDefinition,
    blocksIO: BlockJsonIO
) {
    const components: Record<string, unknown> = {
        'minecraft:item_visual': {
            geometry: {
                identifier: 'geometry.azur.stairs',
                bone_visibility: {
                    bot_ne: true,
                    bot_nw: true,
                    bot_se: true,
                    bot_sw: true,
                    top_ne: true,
                    top_nw: true,
                    top_se: false,
                    top_sw: false,
                },
            },
            material_instances: def.texture,
        },
        'minecraft:material_instances': def.texture,

        'azur:stairs': {},

        'tag:azur:stair': {},
    };

    const permutations = [
        {
            condition: "q.block_state('minecraft:vertical_half') == 'bottom'",
            components: {
                'minecraft:collision_box': {
                    origin: [-8, 0, -8],
                    size: [16, 8, 16],
                },
                'minecraft:selection_box': {
                    origin: [-8, 0, -8],
                    size: [16, 8, 16],
                },
                'tag:azur:bottom_half': {},
            },
        },
        {
            condition: "q.block_state('minecraft:vertical_half') == 'top'",
            components: {
                'minecraft:collision_box': {
                    origin: [-8, 8, -8],
                    size: [16, 8, 16],
                },
                'minecraft:selection_box': {
                    origin: [-8, 8, -8],
                    size: [16, 8, 16],
                },
                'tag:azur:top_half': {},
            },
        },

        //bot 1
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:type') == 1",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: false,
                        top_sw: false,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'north'],
                        },
                    ],
                },
                'tag:azur:north': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:type') == 1",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: false,
                        top_nw: false,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'south'],
                        },
                    ],
                },
                'tag:azur:south': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:type') == 1",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: false,
                        top_se: true,
                        top_sw: false,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'east'],
                        },
                    ],
                },
                'tag:azur:east': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:type') == 1",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: false,
                        top_nw: true,
                        top_se: false,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'west'],
                        },
                    ],
                },
                'tag:azur:west': {},
            },
        },

        //bot 2
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:type') == 2",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: false,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'north', 'west'],
                        },
                    ],
                },
                'tag:azur:north': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:type') == 2",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: false,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'south', 'east'],
                        },
                    ],
                },
                'tag:azur:south': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:type') == 2",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: false,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'north', 'east'],
                        },
                    ],
                },
                'tag:azur:east': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:type') == 2",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: false,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'south', 'west'],
                        },
                    ],
                },
                'tag:azur:west': {},
            },
        },

        //bot 3
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:type') == 3",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: false,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'north', 'east'],
                        },
                    ],
                },
                'tag:azur:north': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:type') == 3",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: false,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'south', 'west'],
                        },
                    ],
                },
                'tag:azur:south': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:type') == 3",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: false,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'south', 'east'],
                        },
                    ],
                },
                'tag:azur:east': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:type') == 3",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: false,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down', 'north', 'west'],
                        },
                    ],
                },
                'tag:azur:west': {},
            },
        },

        //bot 4
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:type') == 4",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: false,
                        top_nw: true,
                        top_se: false,
                        top_sw: false,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down'],
                        },
                    ],
                },
                'tag:azur:north': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:type') == 4",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: false,
                        top_nw: false,
                        top_se: false,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down'],
                        },
                    ],
                },
                'tag:azur:south': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:type') == 4",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: false,
                        top_nw: false,
                        top_se: true,
                        top_sw: false,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down'],
                        },
                    ],
                },
                'tag:azur:east': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:type') == 4",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: false,
                        top_nw: false,
                        top_se: false,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down'],
                        },
                    ],
                },
                'tag:azur:west': {},
            },
        },

        //bot 5
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:type') == 5",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: false,
                        top_se: false,
                        top_sw: false,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down'],
                        },
                    ],
                },
                'tag:azur:north': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:type') == 5",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: false,
                        top_nw: false,
                        top_se: true,
                        top_sw: false,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down'],
                        },
                    ],
                },
                'tag:azur:south': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:type') == 5",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: false,
                        top_se: false,
                        top_sw: false,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down'],
                        },
                    ],
                },
                'tag:azur:east': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'bottom' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:type') == 5",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: false,
                        top_nw: true,
                        top_se: false,
                        top_sw: false,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['down'],
                        },
                    ],
                },
                'tag:azur:west': {},
            },
        },

        //top 1
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:type') == 1",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: false,
                        bot_sw: false,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'north'],
                        },
                    ],
                },
                'tag:azur:north': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:type') == 1",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: false,
                        bot_nw: false,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'south'],
                        },
                    ],
                },
                'tag:azur:south': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:type') == 1",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: false,
                        bot_se: true,
                        bot_sw: false,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'east'],
                        },
                    ],
                },
                'tag:azur:east': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:type') == 1",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: false,
                        bot_nw: true,
                        bot_se: false,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'west'],
                        },
                    ],
                },
                'tag:azur:west': {},
            },
        },

        //top 2
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:type') == 2",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: false,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'north', 'west'],
                        },
                    ],
                },
                'tag:azur:north': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:type') == 2",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: false,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'south', 'east'],
                        },
                    ],
                },
                'tag:azur:south': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:type') == 2",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: false,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'south', 'west'],
                        },
                    ],
                },
                'tag:azur:east': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:type') == 2",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: false,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'north', 'east'],
                        },
                    ],
                },
                'tag:azur:west': {},
            },
        },

        //top 3
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:type') == 3",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: false,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'north', 'east'],
                        },
                    ],
                },
                'tag:azur:north': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:type') == 3",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: false,
                        bot_nw: true,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'south', 'west'],
                        },
                    ],
                },
                'tag:azur:south': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:type') == 3",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: false,
                        bot_se: true,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'south', 'east'],
                        },
                    ],
                },
                'tag:azur:east': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:type') == 3",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: true,
                        bot_se: false,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up', 'north', 'west'],
                        },
                    ],
                },
                'tag:azur:west': {},
            },
        },

        //top 4
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:type') == 4",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: false,
                        bot_nw: true,
                        bot_se: false,
                        bot_sw: false,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up'],
                        },
                    ],
                },
                'tag:azur:north': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:type') == 4",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: false,
                        bot_nw: false,
                        bot_se: false,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up'],
                        },
                    ],
                },
                'tag:azur:south': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:type') == 4",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: false,
                        bot_nw: false,
                        bot_se: true,
                        bot_sw: false,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up'],
                        },
                    ],
                },
                'tag:azur:east': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:type') == 4",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: false,
                        bot_nw: false,
                        bot_se: false,
                        bot_sw: true,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up'],
                        },
                    ],
                },
                'tag:azur:west': {},
            },
        },

        //top 5
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'north' && q.block_state('azur:type') == 5",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: false,
                        bot_se: false,
                        bot_sw: false,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up'],
                        },
                    ],
                },
                'tag:azur:north': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'south' && q.block_state('azur:type') == 5",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: false,
                        bot_nw: false,
                        bot_se: true,
                        bot_sw: false,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up'],
                        },
                    ],
                },
                'tag:azur:south': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'east' && q.block_state('azur:type') == 5",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: true,
                        bot_nw: false,
                        bot_se: false,
                        bot_sw: false,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up'],
                        },
                    ],
                },
                'tag:azur:east': {},
            },
        },
        {
            condition:
                "q.block_state('minecraft:vertical_half') == 'top' && q.block_state('minecraft:cardinal_direction') == 'west' && q.block_state('azur:type') == 5",
            components: {
                'minecraft:geometry': {
                    identifier: 'geometry.azur.stairs',
                    bone_visibility: {
                        bot_ne: false,
                        bot_nw: true,
                        bot_se: false,
                        bot_sw: false,
                        top_ne: true,
                        top_nw: true,
                        top_se: true,
                        top_sw: true,
                    },
                },
                'minecraft:liquid_detection': {
                    detection_rules: [
                        {
                            liquid_type: 'water',
                            can_contain_liquid: true,
                            stops_liquid_flowing_from_direction: ['up'],
                        },
                    ],
                },
                'tag:azur:west': {},
            },
        },
    ];

    blocksIO.set(`${id.description.namespace}:${id.description.prefix}_stairs`, {
        sound: 'wood',
    });

    return {
        format_version: '1.21.70',
        'minecraft:block': {
            description: {
                identifier: `${id.description.namespace}:${id.description.prefix}_stairs`,
                menu_category: {
                    category:
                        def.add_to_category === true
                            ? 'construction'
                            : def.add_to_category === false
                            ? 'none'
                            : def.add_to_category,
                    group:
                        def.add_to_group === true
                            ? 'minecraft:itemGroup.name.stairs'
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
                    'azur:type': [1, 2, 3, 4, 5],
                },
            },
            components,
            permutations,
        },
    };
}

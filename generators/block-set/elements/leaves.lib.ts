import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetLeavesDefinition extends BlockSetBaseDefinition {
    texture: { '*': string };
    decay: boolean;
}

export function createLeaves(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetLeavesDefinition,
    blocksIO: BlockJsonIO
) {
    Deno.writeTextFileSync(
        `BP/blocks/${id.description.namespace}/block_set/${id.name}/leaves.json`,
        JSON.stringify(createLeavesBlockDefinition(id, def, blocksIO))
    );
}

function createLeavesBlockDefinition(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetLeavesDefinition,
    blocksIO: BlockJsonIO
) {
    const components: Record<string, unknown> = {
        'minecraft:material_instances': def.texture,
        'minecraft:flammable': {
            catch_chance_modifier: 10,
            destroy_chance_modifier: 40,
        },
        'minecraft:destructible_by_mining': {
            seconds_to_destroy: 0.3,
        },
        'minecraft:geometry': {
            identifier: `geometry.${id.description.namespace}.custom_leaves`,
            culling: `${id.description.namespace}:leave_like`,
            culling_layer: 'minecraft:culling_layer.leaves',
        },
        'minecraft:light_dampening': 1,

        'tag:minecraft:is_hoe_item_destructible': {},
    };

    if (def.decay === true) {
        components[`${id.description.namespace}:decayable`] = {
            stem_blocks: [
                `${id.description.namespace}:${id.description.prefix}_log`,
                `${id.description.namespace}:${id.description.prefix}_wood`,
            ],
            persistence_state: `${id.description.namespace}:persistent`,
        };
    }

    blocksIO.set(`${id.description.namespace}:${id.description.prefix}_leaves`, {
        sound: 'grass',
    });

    return {
        format_version: '1.21.70',
        'minecraft:block': {
            description: {
                identifier: `${id.description.namespace}:${id.description.prefix}_leaves`,
                menu_category: {
                    category:
                        def.add_to_category === true
                            ? 'nature'
                            : def.add_to_category === false
                            ? 'none'
                            : def.add_to_category,
                    group:
                        def.add_to_group === true
                            ? 'minecraft:itemGroup.name.leaves'
                            : def.add_to_group === false
                            ? undefined
                            : def.add_to_group,
                },
                states: {
                    [`${id.description.namespace}:persistent`]: [false, true],
                },
            },
            components,
        },
    };
}

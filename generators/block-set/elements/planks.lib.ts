import { BlockJsonIO } from '../../../lib/block-json.lib.ts';
import { BlockSetBaseDefinition } from '../block_set.ts';

export interface BlockSetPlanksDefinition extends BlockSetBaseDefinition {
    texture: { '*': string };
}

export function createPlanks(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetPlanksDefinition,
    blocksIO: BlockJsonIO
) {
    Deno.writeTextFileSync(
        `BP/blocks/${id.description.namespace}/block_set/${id.name}/planks.json`,
        JSON.stringify(createPlanksBlockDefinition(id, def, blocksIO))
    );
}

function createPlanksBlockDefinition(
    id: {
        description: {
            namespace: string;
            prefix: string;
        };
        name: string;
    },
    def: BlockSetPlanksDefinition,
    blocksIO: BlockJsonIO
) {
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
    };

    blocksIO.set(`${id.description.namespace}:${id.description.prefix}_planks`, {
        sound: 'wood',
    });

    return {
        format_version: '1.21.70',
        'minecraft:block': {
            description: {
                identifier: `${id.description.namespace}:${id.description.prefix}_planks`,
                menu_category: {
                    category:
                        def.add_to_category === true
                            ? 'construction'
                            : def.add_to_category === false
                            ? 'none'
                            : def.add_to_category,
                    group:
                        def.add_to_group === true
                            ? 'minecraft:itemGroup.name.planks'
                            : def.add_to_group === false
                            ? undefined
                            : def.add_to_group,
                },
            },
            components,
        },
    };
}

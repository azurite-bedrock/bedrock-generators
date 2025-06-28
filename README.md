# bedrock-generators

A collection of public remote generators for [Marathon](https://github.com/azurite-bedrock/regolith-filters/tree/main/marathon), designed to streamline Minecraft Bedrock development workflows.

## Available Generators

### `block-set`

Generates comprehensive vanilla block sets including everything from logs and leaves to trapdoors and boats

## Prerequisites

-   Deno-compatible script pipeline
-   Marathon framework setup

## Usage

To use the `block-set` generator in your project:

```typescript
import { handleBlockSetDefinition } from 'https://deno.land/x/gh:azurite-bedrock:regolith-filters/generators/block-set/block_set.ts';

handleBlockSetDefinition();
```

## Contributing

This repository welcomes contributions of new generators and improvements to existing ones. Please ensure your generators follow the established patterns and include appropriate documentation.

## Links

-   [Marathon Framework](https://github.com/azurite-bedrock/regolith-filters/tree/main/marathon)
-   [Regolith Filters](https://github.com/azurite-bedrock/regolith-filters)

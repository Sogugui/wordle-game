import { extendTailwindMerge } from 'tailwind-merge'

export const classNames = extendTailwindMerge<'foo' | 'bar' | 'baz'>({
    // // ↓ Override elements from the default config
    // //   It has the same shape as the `extend` object, so we're going to skip it here.
    // override: {},

    // // ↓ Extend values from the default config
    // extend: {
    //     // ↓ Add values to existing theme scale or create a new one
    //     theme: {
    //         spacing: ['sm', 'md', 'lg'],
    //     },
    //     // ↓ Add values to existing class groups or define new ones
    //     classGroups: {
    //         foo: ['foo', 'foo-2', { 'bar-baz': ['', '1', '2'] }],
    //         bar: [{ qux: ['auto', (value) => Number(value) >= 1000] }],
    //         baz: ['baz-sm', 'baz-md', 'baz-lg'],
    //     },
    //     // ↓ Here you can define additional conflicts across class groups
    //     conflictingClassGroups: {
    //         foo: ['bar'],
    //     },
    //     // ↓ Define conflicts between postfix modifiers and class groups
    //     conflictingClassGroupModifiers: {
    //         baz: ['bar'],
    //     },
    // },
})

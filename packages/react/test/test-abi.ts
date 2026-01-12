export const testAbi = [
  {
    type: "impl",
    name: "ExampleContract",
    interface_name: "example::IExampleContract",
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "core::option::Option::<core::integer::u8>",
    variants: [
      {
        name: "Some",
        type: "core::integer::u8",
      },
      {
        name: "None",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "core::option::Option::<core::option::Option::<core::integer::u8>>",
    variants: [
      {
        name: "Some",
        type: "core::option::Option::<core::integer::u8>",
      },
      {
        name: "None",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "example::TestStruct",
    members: [
      {
        name: "int128",
        type: "core::integer::u128",
      },
      {
        name: "felt",
        type: "core::felt252",
      },
      {
        name: "tuple",
        type: "(core::integer::u32, core::integer::u32)",
      },
    ],
  },
  {
    type: "enum",
    name: "example::TestEnum",
    variants: [
      {
        name: "int128",
        type: "core::integer::u128",
      },
      {
        name: "felt",
        type: "core::felt252",
      },
      {
        name: "tuple",
        type: "(core::integer::u32, core::integer::u32)",
      },
      {
        name: "novalue",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "core::result::Result::<core::integer::u8, core::integer::u8>",
    variants: [
      {
        name: "Ok",
        type: "core::integer::u8",
      },
      {
        name: "Err",
        type: "core::integer::u8",
      },
    ],
  },
  {
    type: "enum",
    name: "core::result::Result::<core::option::Option::<core::integer::u8>, core::integer::u8>",
    variants: [
      {
        name: "Ok",
        type: "core::option::Option::<core::integer::u8>",
      },
      {
        name: "Err",
        type: "core::integer::u8",
      },
    ],
  },
  {
    type: "struct",
    name: "core::starknet::eth_address::EthAddress",
    members: [
      {
        name: "address",
        type: "core::felt252",
      },
    ],
  },
  {
    type: "struct",
    name: "core::array::Span::<example::TestStruct>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<example::TestStruct>",
      },
    ],
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "interface",
    name: "example::IExampleContract",
    items: [
      {
        type: "function",
        name: "fn_felt",
        inputs: [
          {
            name: "felt",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_felt_u8_bool",
        inputs: [
          {
            name: "felt",
            type: "core::felt252",
          },
          {
            name: "int8",
            type: "core::integer::u8",
          },
          {
            name: "b",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_felt_u8_bool_out_address_felt_u8_bool",
        inputs: [
          {
            name: "felt",
            type: "core::felt252",
          },
          {
            name: "int8",
            type: "core::integer::u8",
          },
          {
            name: "boolean",
            type: "core::bool",
          },
        ],
        outputs: [
          {
            type: "(core::starknet::contract_address::ContractAddress, core::felt252, core::integer::u8, core::bool)",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_felt_out_felt",
        inputs: [
          {
            name: "felt",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_out_simple_option",
        inputs: [],
        outputs: [
          {
            type: "core::option::Option::<core::integer::u8>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_out_nested_option",
        inputs: [],
        outputs: [
          {
            type: "core::option::Option::<core::option::Option::<core::integer::u8>>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_simple_array",
        inputs: [
          {
            name: "arg",
            type: "core::array::Array::<core::integer::u8>",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_out_simple_array",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<core::integer::u8>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_struct",
        inputs: [
          {
            name: "arg",
            type: "example::TestStruct",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_struct_array",
        inputs: [
          {
            name: "arg",
            type: "core::array::Array::<example::TestStruct>",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_enum",
        inputs: [
          {
            name: "arg",
            type: "example::TestEnum",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_enum_array",
        inputs: [
          {
            name: "arg",
            type: "core::array::Array::<example::TestEnum>",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_out_enum_array",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<example::TestEnum>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_result",
        inputs: [
          {
            name: "arg",
            type: "core::result::Result::<core::integer::u8, core::integer::u8>",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_out_result",
        inputs: [],
        outputs: [
          {
            type: "core::result::Result::<core::integer::u8, core::integer::u8>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_nested_result",
        inputs: [
          {
            name: "arg",
            type: "core::result::Result::<core::option::Option::<core::integer::u8>, core::integer::u8>",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_eth_address",
        inputs: [
          {
            name: "arg",
            type: "core::starknet::eth_address::EthAddress",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_span",
        inputs: [
          {
            name: "arg",
            type: "core::array::Span::<example::TestStruct>",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_bytes31",
        inputs: [
          {
            name: "arg",
            type: "core::bytes_31::bytes31",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fn_byte_array",
        inputs: [
          {
            name: "arg",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "event",
    name: "example::example_contract::CounterIncreased",
    kind: "struct",
    members: [
      {
        name: "amount",
        type: "core::integer::u128",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "example::example_contract::CounterDecreased",
    kind: "struct",
    members: [
      {
        name: "amount",
        type: "core::integer::u128",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "example::example_contract::MyStruct",
    kind: "struct",
    members: [
      {
        name: "member",
        type: "core::integer::u128",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "example::example_contract::MyEnum",
    kind: "enum",
    variants: [
      {
        name: "Var1",
        type: "example::example_contract::MyStruct",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "example::example_contract::Event",
    kind: "enum",
    variants: [
      {
        name: "TestCounterIncreased",
        type: "example::example_contract::CounterIncreased",
        kind: "nested",
      },
      {
        name: "TestCounterDecreased",
        type: "example::example_contract::CounterDecreased",
        kind: "nested",
      },
      {
        name: "TestEnum",
        type: "example::example_contract::MyEnum",
        kind: "nested",
      },
    ],
  },
] as const;

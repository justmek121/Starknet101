use starknet::{ContractAddress};
use array::ArrayTrait;

// we need to have the interface of the remote ERC20 contract defined to import the Dispatcher.
#[starknet::interface]
trait IERC20<TContractState> {
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
    fn transferFrom(ref self: TContractState,
        sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> bool;
    fn balanceOf(ref self: TContractState,account: ContractAddress) -> u256;
}


	
#[starknet::interface]
trait IStarknet101<TContractState> {
    fn sendEth(ref self: TContractState, total: u256, array_amount: Array<u128>,array_address: Array<ContractAddress>);
}

#[starknet::contract]
mod Starknet101 {
     use traits::TryInto;
     use traits::Into;
     use option::OptionTrait;
     use super::{IERC20Dispatcher, IERC20DispatcherTrait};
     use starknet::{ContractAddress, get_caller_address, get_contract_address};
    #[storage]
    struct Storage {
        // Counter variable
        token: IERC20Dispatcher
    }

    #[constructor]
    fn constructor(ref self: ContractState, token: ContractAddress) {
        self.token.write(IERC20Dispatcher { contract_address: token });
    }

    #[external(v0)]
    impl Starknet101 of super::IStarknet101<ContractState> {
        fn sendEth(ref self: ContractState, total: u256, array_amount: Array<u128>,array_address: Array<ContractAddress>) {         
            let mut i: u32 = 0;   
            let caller = get_caller_address();
            let this = get_contract_address();
            let amount_len = array_amount.len();
            let address_len = array_address.len();
            self.token.read().transferFrom(caller, this, total);
            loop {
              if i >= address_len { // Break condition
                 break ();
              }
              // Sending to each address
              let my_u256:u256 = (*array_amount.at(i)).into();
             self.token.read().transfer(*array_address.at(i),my_u256);
             i = i + 1;
            };
            //we gonna send back the ETH if something leftover
             let current_balance:u256 = self.token.read().balanceOf(this);
             if (current_balance > 0){
                self.token.read().transfer(caller, current_balance);
             }
        }
    }
}

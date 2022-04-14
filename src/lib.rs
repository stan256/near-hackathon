use near_sdk::near_bindgen;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
struct Greeter;

#[near_bindgen]
impl Greeter {
    pub fn greet(&self, name: String) -> String {
        format!("Hello, {}!", name)
    }
}

#[cfg(test)]
mod tests {
    use near_sdk::json_types::ValidAccountId;
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::testing_env;
    use near_sdk::MockedBlockchain;

    use crate::Greeter;

    #[test]
    fn test_greeting() {
        let test_id = ValidAccountId::try_from("foo.testnet".to_string()).unwrap();
        let test_context = VMContextBuilder::new()
            .current_account_id(test_id)
            .build();
        testing_env!(test_context);

        let greeter = Greeter;
        let greeting = greeter.greet(String::from("John Doe"));
        assert_eq!("Hello, John Doe!", greeting);
    }
}
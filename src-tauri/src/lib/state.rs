use super::serial::FDSerial;

pub struct FDState {
    pub serial: FDSerial,
    pub current_window: String,
}
